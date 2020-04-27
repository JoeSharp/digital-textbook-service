import * as logger from "winston";
import * as _ from "lodash";

import { Lesson } from "../db/model/lesson";
import checkPathId from "../middleware/checkPathId";
import { RestApi } from "./types";

const RESOURCE_URL = "/lesson";
const RESOURCE_FOR_COURSE_ID = `${RESOURCE_URL}/forCourse/:id`;
const RESOURCE_WITH_LESSON_ID = `${RESOURCE_URL}/:id`;

const api: RestApi = ({ app }) => {
  // Get all lessons for a course
  app.get(RESOURCE_FOR_COURSE_ID, async (req, res) => {
    try {
      const courseId = req.params.id;

      const lessons = await Lesson.find({ courseId });
      res.send(lessons);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  // Get a specific lesson
  app.get(RESOURCE_WITH_LESSON_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const lesson = await Lesson.findOne({ _id });

      if (!lesson) {
        return res.sendStatus(404);
      }

      res.send(lesson);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  // Create a lesson, within a course
  app.post(RESOURCE_FOR_COURSE_ID, checkPathId, async (req, res) => {
    try {
      const courseId = req.params.id;

      const body = _.pick(req.body, ["title", "description"]);
      logger.info(
        `Creating Lesson for course ${courseId} with ${JSON.stringify(
          body,
          null,
          2
        )}`
      );

      const lesson = new Lesson({ courseId, ...req.body });
      lesson.save();
      res.send(lesson);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.put(RESOURCE_WITH_LESSON_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const body = _.pick(req.body, ["title", "description"]);
      logger.info(
        `Updating lesson ${_id} with ${JSON.stringify(body, null, 2)}`
      );

      const updated = await Lesson.findOneAndUpdate(
        { _id },
        { $set: body },
        { new: true }
      );

      if (!updated) {
        return res.sendStatus(404);
      }

      return res.send({ updated });
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.delete(RESOURCE_WITH_LESSON_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const removed = await Lesson.findOneAndDelete({ _id });

      if (!removed) {
        return res.sendStatus(404);
      }

      res.send({ removed });
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });
};

export default api;
