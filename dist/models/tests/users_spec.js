"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = supertest_1.default(server_1.default);
const store = new users_1.usersStore();
describe("User Model", () => {
    it(`Get all users method should be defined`, () => {
        expect(store.index).toBeDefined();
    });
    it(`Should have show specific users method`, () => {
        expect(store.show).toBeDefined();
    });
    it(`Should have delete user method`, () => {
        expect(store.destroy).toBeDefined();
    });
    it(`Should have create users method`, () => {
        expect(store.create).toBeDefined();
    });
});
describe("CRUD user Model", () => {
    it("Should retrive all users", async () => {
        const result = await store.index();
        console.log(result);
        expect(result).toEqual([
            {
                id: 1,
                firstname: "Jeff",
                lastname: "Bezos",
                user_pass: "jeff123",
            },
        ]);
    });
    it("Should retrive specific user", async () => {
        const result = await store.show("1");
        console.log(result);
        expect(result).toEqual({
            id: 1,
            firstname: "Jeff",
            lastname: "Bezos",
            user_pass: "jeff123",
        });
    });
});
describe("User Endpoints", () => {
    it("Index method will result in 401 status for not having a token", async () => {
        const result = await request.get("/users");
        expect(result.status).toBe(401);
    });
    it("Show method will result in status 401 for not having a token", async () => {
        const result = await request.get("/users/1");
        expect(result.status).toBe(401);
    });
    it("Create method will result in status 401 for not having a token", async () => {
        const result = await request.post("/users");
        expect(result.status).toBe(401);
    });
});
