import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { response } from "../utils/helpers";

const token = async (req: Request, res: Response) => {
  try {
    const key: string = process.env.SECRET_KEY || "";
    const expiesIn: number = parseInt(process.env.TOEKN_EXPIRES_IN || "500");

    const payload: string | object = {
      exp: Math.floor(Date.now() / 1000) + expiesIn,
    };

    const options: SignOptions = {
      issuer: process.env.TOKEN_ISSUER,
      algorithm: "HS256",
    };

    const token: string = jwt.sign(payload, key, options);
    return response(res, "JWT token.", true, token);
  } catch (error) {
    console.log(error);

    return response(
      res,
      "Something went wrong!, Please try again later",
      false,
      {},
      500
    );
  }
};

const verify = async (req: Request, res: Response) => {
  let result = {
    message: "Authorization header missing",
    success: false,
    data: {},
    status: 401,
  };
  try {
    const authorizationHeader: string | undefined =
      req.headers["authorization"];

    if (!authorizationHeader) {
      return result;
    }
    const [scheme, token] = authorizationHeader.split(" ");

    if (scheme !== "Bearer") {
      result.message = "Invalid authorization scheme";
      return result;
    }
    const key: string = process.env.SECRET_KEY || "";

    jwt.verify(token, key);

    return {
      message: "JWT token verified successfully",
      success: true,
      data: {},
      status: 200,
    };
  } catch (error) {
    let message: string = "";
    if ((error as Error).name === "TokenExpiredError") {
      message = "JWT has expired";
    } else if ((error as Error).name === "JsonWebTokenError") {
      message = "Invalid JWT: " + (error as Error).message;
    } else {
      message = "JWT verification failed: " + (error as Error).message;
    }
    result.message = message;
    return result;
  }
};

export { token, verify };
