import { Request, Response } from "express";
import { response } from "../utils/helpers";
import * as Temperature from "../models/Temperature";

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
      false
    );
  }
};

export { cityStats };
