import { Express } from "express";
import { MongoClient } from "mongodb";
import * as logger from "winston";

import { Course, ICourse } from "./db/model/course";

interface Props {
  app: Express;
}

const coursesApi = ({ app }: Props) => {
  app.post("/courses", async (req, res) => {
    const course = new Course(req.body);
    try {
      course.save();
      res.send(course);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.get("/courses", async (req, res) => {
    try {
      const courses = await Course.find({});

      res.send(courses);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.get("/courses/:id", async (req, res) => {
    try {
      const course = await Course.findOne({ _id: req.params.id });

      res.send(course);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });
};

export default coursesApi;
