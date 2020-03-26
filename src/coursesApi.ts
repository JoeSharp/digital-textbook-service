import { Express } from "express";
import { MongoClient } from "mongodb";
import * as logger from "winston";

import { Course, CORS_HEADER } from "./types";

interface Props {
  app: Express;
}

const coursesApi = ({ app }: Props) => {
  app.get("/courses", async (req, res) => {
    const client = new MongoClient(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    try {
      await client.connect();

      const collection = client
        .db(process.env.DB_NAME)
        .collection(process.env.DB_COLLECTION_COURSES);
      // perform actions on the collection object
      const courses: Course[] = [];
      const cursor = collection.find();
      while (await cursor.hasNext()) {
        const course = await cursor.next();
        courses.push(course as Course);
      }

      res.setHeader(CORS_HEADER, process.env.UI_ORIGIN);
      res.send(courses);
    } catch (err) {
      logger.error(err);
      res.sendStatus(500);
    }

    // Close connection
    client.close();
  });
};

export default coursesApi;
