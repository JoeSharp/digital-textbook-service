import { RequestHandler } from "express";

import oauth2Factory, { ModuleOptions } from "simple-oauth2";

const credentials: ModuleOptions = {
  client: {
    id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://www.googleapis.com/auth/drive.appdata",
  },
};

const oauth2 = oauth2Factory.create(credentials);

const authenticate: RequestHandler = (req, res, next) => {
  next();
  // var token = req.header('x-auth');

  // User.findByToken(token)
  //   .then((user) => {
  //     if (!user) {
  //       return Promise.reject('No user found');
  //     }

  //     req.user = user;
  //     req.token = token;
  //     next();
  //   })
  //   .catch((e) => {
  //     res.status(401).send();
  //   });
};

export default authenticate;
