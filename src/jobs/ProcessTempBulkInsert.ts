import Bull, { Job } from "bull";
import tempBulkInsertQueue from "../queues/TempBulkInsertQueue";
import { Range, Sheet, WorkBook, read, utils } from "xlsx";
import * as Temperature from "../models/Temperature";
import { excelDateToDate } from "../utils/helpers";

console.log("Worker is running, Press Ctrl+c to exit...\n");

interface SheetRange {
  s: { c: number; r: number };
  e: { c: number; r: number };
}

const processSheet = async (sheet: Sheet, chunkSize: number) => {
  const range: Range = utils.decode_range(sheet["!ref"] || "");
  const totalRows: number = range.e.r; // excluding heading

  chunkSize = Math.min(chunkSize, totalRows);

  let from: number = 1;
  let to: number = from + (chunkSize - 1);

  let loopCounter: number = Math.ceil(totalRows / chunkSize);

  for (let i = 0; i < loopCounter; i++) {
    let newRange: SheetRange = {
      s: { c: range.s.c, r: from },
      e: { c: range.e.c, r: to },
    };

    let data: Array<any> = utils.sheet_to_json(sheet, {
      header: 1,
      range: newRange,
    });

    let mappedData = data.map((d) => {
      return {
        city_id: d[0],
        temp: d[1],
        timestamp: excelDateToDate(d[2]),
      };
    });

    await Temperature.bulkInsert(mappedData);

    from += chunkSize;
    to = from + (chunkSize - 1);
  }
};

const processHandler = async (job: Bull.Job) => {
  try {
    const file = job.data.file;
    const fileBuffer = file.buffer.data;
    const workbook: WorkBook = read(fileBuffer, { type: "buffer" });
    const sheetNames: string[] = workbook.SheetNames;
    let chunkSize: number = 1000;

    for (const sheetName of sheetNames) {
      const sheet: Sheet = workbook.Sheets[sheetName];
      await processSheet(sheet, chunkSize);
    }
  } catch (error) {
    const errorName: string = (error as Error).name;
    throw new Error(
      `error -> ${errorName}, retried... (${job.attemptsMade + 1}/${
        job.opts.attempts
      })`
    );
  }
};

export default tempBulkInsertQueue.process(
  "processTempBulkInsert",
  processHandler
);

tempBulkInsertQueue.on("active", (job: Job) => {
  console.log(`Job #${job.id} is now active\n`);
});

tempBulkInsertQueue.on("completed", (job: Job) => {
  console.log(`Job #${job.id} completed with\n`);
});

tempBulkInsertQueue.on("failed", (job: Job, error: any) => {
  console.error(`Job #${job.id} failed with:`, error.message, "\n");
});
