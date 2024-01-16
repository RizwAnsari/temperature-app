import { Response } from "express";

const response = (
  res: Response,
  message: string,
  success: boolean = true,
  data: any = {},
  status: number = 200
) => {
  let responseData = {
    success,
    message,
    data,
  };
  return res.status(status).send(responseData);
};

const excelDateToDate = (excel_date: number) => {
  return new Date(
    Math.round((excel_date - 25569) * 86400 * 1000)
  ).toISOString();
};

export { response, excelDateToDate };
