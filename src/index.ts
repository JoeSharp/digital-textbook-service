import "./env";
import express from "express";
import bodyParser from "body-parser";
import * as logger from "winston";

import courseApi from "./api/courseApi";
import lessonApi from "./api/lessonApi";
import taskApi from "./api/taskApi";
import { connectDb } from "./db/mongoose";
import uiCors from "./middleware/cors_ui";
import authenticate from "./middleware/authenticate";

logger.configure({
  level: "debug",
  transports: [new logger.transports.Console()],
});

connectDb();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authenticate);
app.use(uiCors);

const PORT = process.env.PORT || 8080;

courseApi({ app });
lessonApi({ app });
taskApi({ app });

// start the Express server
app.listen(PORT, () => {
  logger.info(`server started on port ${PORT}`);
});
