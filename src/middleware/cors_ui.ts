import { RequestHandler } from "express";
import * as logger from "winston";

const uiCors: RequestHandler = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.UI_ORIGIN);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "authorization,content-type,accept"
  );
  next();
};

export default uiCors;
