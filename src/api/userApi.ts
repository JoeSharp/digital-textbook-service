import logger from "winston";
import _ from "lodash";

import { RestApi } from "./types";
import checkPathId from "../middleware/checkPathId";
import { IUser, User, IUserProfile, IApplicationRoles } from "../db/model/user";
import authenticate from "../middleware/authenticate";

const RESOURCE_URL = "/user";
const RESOURCE_LOGIN = `${RESOURCE_URL}/me/login`;
const RESOURCE_WITH_ID = `${RESOURCE_URL}/:id`;

const api: RestApi = ({ app }) => {
  app.get(RESOURCE_LOGIN, authenticate, async (req, res) => {
    try {
      const googleTicket = req.googleTicket;

      if (!googleTicket) {
        res.send(401);
      }

      // Auto Create user in database etc?

      const user: IUser = {
        profile: IUserProfile.administrator,
        emailAddress: googleTicket.getPayload().email,
        authorisations: [
          IApplicationRoles.editResources,
          IApplicationRoles.editUsers,
          IApplicationRoles.study,
        ],
      };

      res.send(user);
    } catch (err) {
      logger.error(err);
      res.status(500);
      res.send(err);
    }
  });

  app.get(RESOURCE_WITH_ID, checkPathId, async (req, res) => {
    try {
      const _id = req.params.id;

      const found = await User.findOne({ _id });

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
};

export default api;
