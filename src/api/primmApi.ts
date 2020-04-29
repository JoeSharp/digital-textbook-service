import * as logger from "winston";
import * as _ from "lodash";

import { PrimmChallenge } from "../db/model/primm";
import checkPathId from "../middleware/checkPathId";
import { RestApi } from "./types";

const RESOURCE_URL = "/primm";
const RESOURCE_WITH_ID = `${RESOURCE_URL}/:id`;
const RESOURCE_WITH_ID_PREDICT = `${RESOURCE_URL}/predict/:id`;
const RESOURCE_WITH_ID_RUN = `${RESOURCE_URL}/run/:id`;
const RESOURCE_WITH_ID_INVESTIGATE = `${RESOURCE_URL}/investigate/:id`;
const RESOURCE_WITH_ID_MODIFY = `${RESOURCE_URL}/modify/:id`;
const RESOURCE_WITH_ID_MAKE = `${RESOURCE_URL}/make/:id`;

const api: RestApi = ({ app }) => {
  // Get all challenges, title and description only
  app.get(RESOURCE_URL, async (req, res) => {
    try {
      const found = await PrimmChallenge.find({}, "title description");
      res.send(found);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  // Get a specific challenge
  app.get(RESOURCE_WITH_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const found = await PrimmChallenge.findOne({ _id });

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
      const challenge = new PrimmChallenge(req.body);
      challenge.save();
      res.send(challenge);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.put(RESOURCE_WITH_ID_PREDICT, async (req, res) => {
    try {
      const _id = req.params.id;

      const body = _.pick(req.body, ["codeWidget", "questionSets"]);
      logger.info(`Updating PRIMM Predict ${_id} with ${JSON.stringify(body)}`);

      const updated = await PrimmChallenge.findOneAndUpdate(
        { _id },
        {
          $set: {
            predict: body,
          },
        },
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

      const removed = await PrimmChallenge.findOneAndDelete({ _id });

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
