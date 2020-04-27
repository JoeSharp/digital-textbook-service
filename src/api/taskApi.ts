import * as logger from "winston";
import * as _ from "lodash";

import { Task } from "../db/model/task/task";
import checkPathId from "../middleware/checkPathId";
import { RestApi } from "./types";

const RESOURCE_URL = "/task";
const RESOURCE_FOR_LESSON_ID = `${RESOURCE_URL}/forLesson/:id`;
const RESOURCE_WITH_TASK_ID = `${RESOURCE_URL}/:id`;

const lessonApi: RestApi = ({ app }) => {
  // Get all tasks for lesson
  app.get(RESOURCE_FOR_LESSON_ID, async (req, res) => {
    try {
      const lessonId = req.params.id;

      const tasks = await Task.find({ lessonId });
      res.send(tasks);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  // Get a specific task
  app.get(RESOURCE_WITH_TASK_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const task = await Task.findOne({ _id });

      if (!task) {
        return res.sendStatus(404);
      }

      res.send(task);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  // Create a lesson, within a course
  app.post(RESOURCE_FOR_LESSON_ID, checkPathId, async (req, res) => {
    try {
      const lessonId = req.params.id;

      const body = _.pick(req.body, [
        "type",
        "title",
        "instruction",
        "videoLink",
      ]);
      logger.info(
        `Creating Task for lesson ${lessonId} with ${JSON.stringify(
          body,
          null,
          2
        )}`
      );

      const task = { lessonId, ...req.body };
      await Task.create(task);
      res.send(task);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.put(RESOURCE_WITH_TASK_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const body = _.pick(req.body, ["title", "instruction"]);
      logger.info(`Updating task ${_id} with ${JSON.stringify(body, null, 2)}`);

      const updated = await Task.findOneAndUpdate(
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

  app.delete(RESOURCE_WITH_TASK_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const removed = await Task.findOneAndDelete({ _id });

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

export default lessonApi;
