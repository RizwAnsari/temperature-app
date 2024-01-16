import { Request, Response } from "express";
import { response } from "../utils/helpers";
import * as Temperature from "../models/Temperature";
import tempBulkInsertQueue from "../queues/TempBulkInsertQueue";

const cityStats = async (req: Request, res: Response) => {
  try {
    const cityId = parseInt(req.params.id);
    const exists = await Temperature.exists(cityId);
    if (exists) {
      const stats = await Temperature.stats(cityId);
      let formattedData = {
        min: stats._min.temp,
        max: stats._max.temp,
        mean: stats._avg.temp,
      };
      return response(
        res,
        "Temperature statistics in celsius",
        true,
        formattedData
      );
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
    tempBulkInsertQueue.add("processTempBulkInsert", { file });

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
