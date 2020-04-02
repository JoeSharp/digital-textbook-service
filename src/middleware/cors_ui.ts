import { RequestHandler } from "express";

const uiCors: RequestHandler = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.UI_ORIGIN);
  next();
};

export default uiCors;
