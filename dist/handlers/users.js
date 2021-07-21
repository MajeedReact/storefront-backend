"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authJWT_1 = __importDefault(require("../middlewares/authJWT"));
dotenv_1.default.config();
const store = new users_1.usersStore();
const getAllUsers = async (_req, res) => {
    try {
        const allUsers = await store.index();
        res.json(allUsers);
    }
    catch (err) {
        throw new Error(`An error occured retriving users: ${err}`);
    }
};
const createUser = async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        user_pass: req.body.user_pass,
    };
    try {
        const newUser = await store.create(user);
        res.json(`Sucessfully registered ${newUser.firstname}`);
        //assign a token for new registered users
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        console.log(token);
    }
    catch (err) {
        throw new Error(`An error occured creating your account: ${err}`);
    }
};
//this method for testing purposes do not use this in production
const createUserWithoutHash = async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        user_pass: req.body.user_pass,
    };
    try {
        const newUser = await store.createWithoutHash(user);
        res.json(`Sucessfully registered ${newUser.firstname}`);
        //assign a token for new registered users
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        console.log(token);
    }
    catch (err) {
        throw new Error(`An error occured creating your account: ${err}`);
    }
};
const getUser = async (req, res) => {
    try {
        //example  http://localhost:3000/users/1
        const user = await store.show(req.params.id);
        if (user == null) {
            res.status(404);
            res.json("Not found");
            return;
        }
        res.json(user);
    }
    catch (err) {
        throw new Error(`An error occured retriving user: ${err}`);
    }
};
const destroy = async (req, res) => {
    try {
        const user = await store.destroy(req.body.id);
        console.log(user);
        res.json(user);
    }
    catch (err) {
        throw new Error(`An Error occured removing the user: ${err}`);
    }
};
const users_route = (app) => {
    //get all users
    app.get("/users", authJWT_1.default.verifyToken, getAllUsers);
    //get specific user by id
    app.get("/users/:id", authJWT_1.default.verifyToken, getUser);
    //create a user
    app.post("/users", authJWT_1.default.verifyToken, createUser);
    //remove a user
    app.delete("/users", authJWT_1.default.verifyToken, destroy);
    //route for testing
    app.post("/users/test", authJWT_1.default.verifyToken, createUserWithoutHash);
};
exports.default = users_route;
