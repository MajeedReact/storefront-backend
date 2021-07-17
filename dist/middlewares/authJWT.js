"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//verifing token of the user
const verifyToken = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header?.split(" ")[1];
        const decode = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json(`Access denied`);
    }
};
//checking if the token users id matches the requested id
const auth = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header?.split(" ")[1];
        const decode = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decode.user.id != req.body.users_id) {
            throw new Error("User id does not match");
        }
        next();
    }
    catch (err) {
        res.status(401);
        res.json(`An error occured: ${err}`);
    }
};
module.exports = {
    verifyToken: verifyToken,
    auth: auth,
};
