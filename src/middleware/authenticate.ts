import { RequestHandler } from "express";

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
