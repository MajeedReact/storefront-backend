import express, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//verifing token of the user
const verifyToken = (req: Request, res: Response, next: Function): void => {
  try {
    const header = req.headers.authorization;
    const token = header?.split(" ")[1];
    const decode = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as Secret
    );
    next();
  } catch (err) {
    res.status(401);
    res.json(`Access denied`);
  }
};

//checking if the token users id matches the requested id
const auth = (req: Request, res: Response, next: Function): void => {
  try {
    const header = req.headers.authorization;
    const token = header?.split(" ")[1];
    const decode = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as Secret
    ) as jwt.JwtPayload;

    if (decode.user.id != req.body.users_id) {
      throw new Error("User id does not match");
    }

    next();
  } catch (err) {
    res.status(401);
    res.json(`An error occured: ${err}`);
  }
};

export = {
  verifyToken: verifyToken,
  auth: auth,
};
