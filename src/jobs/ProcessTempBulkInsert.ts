import Bull from "bull";
import tempBulkInsertQueue from "../queues/TempBulkInsertQueue";

const processHandler = async (job: Bull.Job) => {
  const fileData = job.data.file;

  console.log("File processed:", fileData);
};

export default tempBulkInsertQueue.process(
  "processTempBulkInsert",
  processHandler
);
