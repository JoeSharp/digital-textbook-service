import * as logger from "winston";
import * as _ from "lodash";
import { RestApi } from "./types";

import { IUser } from "../db/model/user";

const RESOURCE_URL = "/user";

const userApi: RestApi = ({ app }) => {
  app.get(RESOURCE_URL, (req, res) => {
    const token = req.header("Authorization");
    logger.info(`Logging in with auth token: ${token}`);

    const user: IUser = {
      emailAddress: "Some Guy" + token,
    };

    res.send(user);
  });
};

export default userApi;
