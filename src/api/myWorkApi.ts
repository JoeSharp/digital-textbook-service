import * as logger from "winston";
import * as _ from "lodash";

import { RestApi } from "./types";
import { IWorkType, Work, getBlankWorkContent } from "../db/model/myWork";

const RESOURCE_URL = "/myWork";
const RESOURCE_WITH_WORK_TYPE_AND_ID = `${RESOURCE_URL}/:workType/:workId`;

const api: RestApi = ({ app }) => {
  app.get(RESOURCE_WITH_WORK_TYPE_AND_ID, async (req, res) => {
    const workType = Object.values(IWorkType).find(
      (w) => w.toString() === req.params.workType
    );
    const workId = req.params.workId;

    try {
      const found = await Work.findOne({ workType, workId });

      if (!found) {
        const created = await Work.create({
          workType,
          workId,
          workContent: getBlankWorkContent(workType),
        });
        return res.send(created.workContent);
      }

      res.send(found.workContent);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.post(RESOURCE_WITH_WORK_TYPE_AND_ID, async (req, res) => {
    const workType = Object.values(IWorkType).find(
      (w) => w.toString() === req.params.workType
    );
    const workId = req.params.workId;

    try {
      const found = await Work.findOne({ workType, workId });
      found.workContent = req.body;
      logger.info(
        `Saving Changes ${workType} - ${workId} - ${JSON.stringify(
          found.workContent
        )}`
      );
      found.save();
      res.send(found);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });
};

export default api;
