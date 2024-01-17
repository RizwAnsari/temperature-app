import { Request, Response } from "express";
import { response } from "../utils/helpers";
import * as Cache from "../models/TemperatureCache";
import * as Temperature from "../models/Temperature";
import tempBulkInsertQueue from "../queues/TempBulkInsertQueue";

const cityStats = async (req: Request, res: Response) => {
  try {
    const cityId = parseInt(req.params.id);
    const stats = await Cache.stats(cityId);
    if (stats) {
      return response(res, "Temperature statistics in celsius", true, stats);
    }
    return response(
      res,
      "Temperature data not exists for the requested city",
      false,
      {},
      400
    );
  } catch (error) {
    return response(
      res,
      "Something went wrong!, Please try again later",
      false,
      {},
      500
    );
  }
};

const bulkInsert = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return response(res, "Please a upload a file.", false, {}, 400);
    }

    tempBulkInsertQueue.add(
      "processTempBulkInsert",
      { file },
      {
        attempts: parseInt(process.env.QUEUE_RETRY_ATTEMPTS || "3"),
        backoff: {
          type: process.env.QUEUE_BACKOFF_TYPE || "",
          delay: parseInt(process.env.QUEUE_RETRY_DELAY || "1000"),
        },
      }
    );

    return response(res, "File is queued for processing.");
  } catch (e) {
    return response(
      res,
      "Something went wrong!, Please try again later",
      false,
      {},
      500
    );
  }
};

export { cityStats, bulkInsert };
