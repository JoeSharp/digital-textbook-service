import { Express } from "express";
import * as logger from "winston";
import * as _ from "lodash";

import { Course } from "./db/model/course";
import { ObjectID } from "mongodb";

interface Props {
  app: Express;
}

const coursesApi = ({ app }: Props) => {
  app.get("/course", async (req, res) => {
    try {
      const courses = await Course.find({});
      res.send(courses);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.get("/course/:id", async (req, res) => {
    try {
      const _id = req.params.id;

      if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
      }

      const course = await Course.findOne({ _id });
      res.send(course);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.post("/course", async (req, res) => {
    try {
      const course = new Course(req.body);
      course.save();
      res.send(course);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.patch("/course/:id", async (req, res) => {
    try {
      const _id = req.params.id;

      if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
      }

      const body = _.pick(req.body, ["name", "description"]);

      const updated = await Course.findOneAndUpdate(
        { _id },
        { $set: body },
        { new: true }
      );

      if (!updated) {
        return res.status(404).send();
      }

      return res.send({ updated });
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.delete("/course/:id", async (req, res) => {
    try {
      const _id = req.params.id;

      if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
      }

      const removed = await Course.findOneAndDelete({ _id });

      if (!removed) {
        return res.status(404).send();
      }

      res.send({ removed });
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });
};

export default coursesApi;
