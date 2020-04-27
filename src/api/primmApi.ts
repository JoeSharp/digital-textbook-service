import * as logger from "winston";
import * as _ from "lodash";

import { PrimmChallenge } from "../db/model/primm";
import checkPathId from "../middleware/checkPathId";
import { RestApi } from "./types";

const RESOURCE_URL = "/primm";
const RESOURCE_WITH_CHALLENGE_ID = `${RESOURCE_URL}/:id`;

const api: RestApi = ({ app }) => {
  // Get all challenges
  app.get(RESOURCE_URL, async (req, res) => {
    try {
      const challenges = await PrimmChallenge.find({});
      res.send(challenges);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  // Get a specific challenge
  app.get(RESOURCE_WITH_CHALLENGE_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const task = await PrimmChallenge.findOne({ _id });

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
};

export default api;
