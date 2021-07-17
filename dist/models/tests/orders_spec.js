"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const products_1 = require("../products");
const users_1 = require("../users");
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = supertest_1.default(server_1.default);
const store = new orders_1.orderStore();
const product = new products_1.productsStore();
const user = new users_1.usersStore();
describe("Order Model", () => {
    it(`Should have all active orders by user method`, () => {
        expect(store.orderByUser).toBeDefined();
    });
    it(`Should have show specific users order method`, () => {
        expect(store.show).toBeDefined();
    });
    it(`Should have show update order method`, () => {
        expect(store.update).toBeDefined();
    });
    it(`Should have create order method`, () => {
        expect(store.createOrder).toBeDefined();
    });
    it(`Should have show all completed orders method`, () => {
        expect(store.completedOrders).toBeDefined();
    });
    it(`Should have update order method`, () => {
        expect(store.update).toBeDefined();
    });
});
//we gonna create a user and a product here so we can pass it on to the order
describe("Creating a user and a product", () => {
    it("it should create a product", async () => {
        const result = await product.create({
            name: "GTX 1050 TI",
            price: "150",
            category: "graphic-cards",
        });
        expect(result).toEqual({
            id: 1,
            name: "GTX 1050 TI",
            price: "150",
            category: "graphic-cards",
        });
    });
});
//I had to create a method without hashing passwords because I cannot predict what is the outcome of the hash
it("it should create a user", async () => {
    const result = await user.createWithoutHash({
        firstname: "Jeff",
        lastname: "Bezos",
        user_pass: "jeff123",
    });
    expect(result).toEqual({
        id: 1,
        firstname: "Jeff",
        lastname: "Bezos",
        user_pass: "jeff123",
    });
});
describe("CRUD Order model", () => {
    it("It should create an order", async () => {
        const result = await store.createOrder({
            product_id: "1",
            quantity: "1",
            users_id: "1",
            status: "Active",
        });
        expect(result).toEqual({
            id: 1,
            product_id: "1",
            quantity: "1",
            users_id: "1",
            status: "Active",
        });
    });
    it("It should retrive all orders by user that are active", async () => {
        const result = await store.orderByUser("1");
        expect(result).toEqual([
            {
                id: 1,
                product_id: "1",
                quantity: "1",
                users_id: "1",
                status: "Active",
            },
        ]);
    });
    it("It should retrive all orders that are completed by user", async () => {
        const result = await store.completedOrders("1");
        expect(result).toEqual([]);
    });
});
describe("Orders Endpoint", () => {
    it("It should not display orders when the user does not have token", async () => {
        const result = await request.get("/orders");
        expect(result.status).toBe(401);
    });
    it("It should not display completed orders when the user does not have token", async () => {
        const result = await request.get("/orders/completed");
        expect(result.status).toBe(401);
    });
});
