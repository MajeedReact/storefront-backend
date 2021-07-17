import express, { Request, Response } from "express";
import { users, usersStore } from "../models/users";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import authJWT from "../middlewares/authJWT";

dotenv.config();

const store = new usersStore();

const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await store.index();
    res.json(allUsers);
  } catch (err) {
    throw new Error(`An error occured retriving users: ${err}`);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  const user: users = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    user_pass: req.body.user_pass,
  };
  try {
    const newUser = await store.create(user);
    res.json(`Sucessfully registered ${newUser.firstname}`);

    //assign a token for new registered users
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as Secret
    );
    console.log(token);
  } catch (err) {
    throw new Error(`An error occured creating your account: ${err}`);
  }
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    //example  http://localhost:3000/users/1
    const user = await store.show(req.params.id);
    if (user == null) {
      res.status(404);
      res.json("Not found");
      return;
    }
    res.json(user);
  } catch (err) {
    throw new Error(`An error occured retriving user: ${err}`);
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await store.destroy(req.body.id);
    console.log(user);
    res.json(user);
  } catch (err) {
    throw new Error(`An Error occured removing the user: ${err}`);
  }
};

const users_route = (app: express.Application) => {
  //get all users
  app.get("/users", authJWT.verifyToken, getAllUsers);
  //get specific user by id
  app.get("/users/:id", authJWT.verifyToken, getUser);
  //create a user
  app.post("/users", authJWT.verifyToken, createUser);
  //remove a user
  app.delete("/users", authJWT.verifyToken, destroy);
};

export default users_route;
