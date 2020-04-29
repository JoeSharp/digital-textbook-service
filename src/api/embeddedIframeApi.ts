import * as logger from "winston";
import * as _ from "lodash";

import {
  EmbeddedIframe,
  IEmbeddedIframeSystem,
} from "../db/model/embeddedIframe";
import checkPathId from "../middleware/checkPathId";
import { RestApi } from "./types";

const RESOURCE_URL = "/embeddedIframe";
const RESOURCE_WITH_ID = `${RESOURCE_URL}/:id`;

const api: RestApi = ({ app }) => {
  app.get(RESOURCE_URL, async (req, res) => {
    try {
      const found = await EmbeddedIframe.find({});
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

      const found = await EmbeddedIframe.findOne({ _id });

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
      const created = await EmbeddedIframe.create(req.body);
      // .save?
      res.send(created);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });
};

export default api;
