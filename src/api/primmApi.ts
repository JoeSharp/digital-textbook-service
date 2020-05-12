import * as logger from "winston";
import * as _ from "lodash";

import { PrimmChallenge, IPrimmChallenge } from "../db/model/primm";
import checkPathId from "../middleware/checkPathId";
import { RestApi } from "./types";
import authenticate from "../middleware/authenticate";

const RESOURCE_URL = "/primm";
const RESOURCE_WITH_ID = `${RESOURCE_URL}/:id`;

const api: RestApi = ({ app }) => {
  // Get all challenges, title and description only
  app.get(RESOURCE_URL, authenticate, async (req, res) => {
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
  app.get(RESOURCE_WITH_ID, authenticate, checkPathId, async (req, res) => {
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

  app.post(RESOURCE_URL, authenticate, async (req, res) => {
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

  const createUpdatePart = (
    section: keyof IPrimmChallenge,
    fields: string[]
  ) => {
    app.put(
      `${RESOURCE_URL}/${section}/:id`,
      authenticate,
      async (req, res) => {
        try {
          const _id = req.params.id;

          const body = _.pick(req.body, ["codeWidget", ...fields]);
          logger.debug(
            `Updating PRIMM ${section} ${_id} with ${JSON.stringify(body)}`
          );

          const updated = await PrimmChallenge.findOneAndUpdate(
            { _id },
            {
              $set: {
                [section]: body,
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
      }
    );
  };

  createUpdatePart("predict", ["scaffoldedQuestions"]);
  createUpdatePart("run", []);
  createUpdatePart("investigate", ["scaffoldedQuestions"]);
  createUpdatePart("modify", ["scaffoldedInstructions"]);
  createUpdatePart("make", ["instructions"]);

  app.delete(RESOURCE_WITH_ID, authenticate, checkPathId, async (req, res) => {
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
