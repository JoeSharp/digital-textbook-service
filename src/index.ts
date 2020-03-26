import "./env";
import express from "express";
import bodyParser from "body-parser";
import * as logger from "winston";

import coursesApi from "./coursesApi";

logger.configure({
  level: "debug",
  transports: [new logger.transports.Console()]
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

// define a route handler for the default home page
coursesApi({ app });

// start the Express server
app.listen(PORT, () => {
  logger.info(`server started at http://localhost:${PORT}`);
});
