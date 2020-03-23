import express from "express";
import bodyParser from "body-parser";
import * as logger from "winston";
import { MongoClient } from "mongodb";

import * as config from "../config.json";

logger.configure({
  level: "debug",
  transports: [new logger.transports.Console()]
});

logger.info(`Running with config: ${JSON.stringify(config, null, 2)}`);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8080; // default port to listen

const CORS_HEADER = "Access-Control-Allow-Origin";

interface Course {
  name: string;
}

// define a route handler for the default home page
app.get("/courses", async (req, res) => {
  const client = new MongoClient(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();

    const collection = client
      .db(config.DB_NAME)
      .collection(config.DB_COLLECTION_COURSES);
    // perform actions on the collection object
    const courses: Course[] = [];
    const cursor = collection.find();
    while (await cursor.hasNext()) {
      const course = await cursor.next();
      courses.push(course as Course);
    }

    res.setHeader(CORS_HEADER, config.UI_ORIGIN);
    res.send(courses);
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }

  // Close connection
  client.close();
});

// start the Express server
app.listen(port, () => {
  logger.info(`server started at http://localhost:${port}`);
});
