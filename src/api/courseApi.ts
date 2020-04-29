import * as logger from "winston";
import * as _ from "lodash";

import { Course } from "../db/model/course";
import checkPathId from "../middleware/checkPathId";
import { RestApi } from "./types";

const RESOURCE_URL = "/course";
const RESOURCE_WITH_ID = `${RESOURCE_URL}/:id`;

const api: RestApi = ({ app }) => {
  app.get(RESOURCE_URL, async (req, res) => {
    try {
      const found = await Course.find({});
      res.send(found);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.get(RESOURCE_WITH_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const found = await Course.findOne({ _id });

      if (!found) {
        return res.sendStatus(404);
      }

      res.send(found);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.post(RESOURCE_URL, async (req, res) => {
    try {
      const created = new Course(req.body);
      created.save();
      res.send(created);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.put(RESOURCE_WITH_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const body = _.pick(req.body, ["name", "description"]);
      logger.info(
        `Updating course ${_id} with ${JSON.stringify(body, null, 2)}`
      );

      const updated = await Course.findOneAndUpdate(
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

  app.delete(RESOURCE_WITH_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const removed = await Course.findOneAndDelete({ _id });

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
