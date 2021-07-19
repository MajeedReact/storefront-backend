"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class usersStore {
    //retriving all users
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users;";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users: ${err}`);
        }
    }
    //creating a new user
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO users(firstname, lastname, email, user_pass) VALUES ($1, $2, $3, $4) RETURNING *";
            //hashing password with salt and pepper
            const hash = bcrypt_1.default.hashSync(u.user_pass + process.env.BCRYPT_PASSWORD, Number(process.env.SALT_ROUNDS));
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.email,
                hash,
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`An error occured creating your account: ${err}`);
        }
    }
    //this method for testing in JASMINE so we can compare passwords
    //DO NOT USE THIS METHOD FOR development its for testing purposes only
    async createWithoutHash(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO users(firstname, lastname, email, user_pass) VALUES ($1, $2, $3, $4) RETURNING *";
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.email,
                u.user_pass,
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`An error occured creating your account: ${err}`);
        }
    }
    //show a specific user
    async show(id) {
        const conn = await database_1.default.connect();
        const sql = "SELECT * FROM users WHERE id = $1;";
        const result = await conn.query(sql, [id]);
        conn.release();
        //if user not found return null
        if (result.rows.length <= 0) {
            return null;
        }
        return result.rows[0];
    }
    //remove a user
    async destroy(id) {
        const conn = await database_1.default.connect();
        const sql = "DELETE FROM users WHERE id = $1";
        const result = await conn.query(sql, [id]);
        conn.release();
        const product = result.rows[0];
        return product;
    }
}
exports.usersStore = usersStore;
