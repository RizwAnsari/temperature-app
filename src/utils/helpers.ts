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

export { response };
