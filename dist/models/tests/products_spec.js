"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = supertest_1.default(server_1.default);
const store = new products_1.productsStore();
describe("products Model", () => {
    it(`Should have get all products method`, () => {
        expect(store.index).toBeDefined();
    });
    it(`Should have show specific products method`, () => {
        expect(store.show).toBeDefined();
    });
    it(`Should have delete product method`, () => {
        expect(store.destroy).toBeDefined();
    });
    it(`Should have create products method`, () => {
        expect(store.destroy).toBeDefined();
    });
    it(`Should have get products by category method`, () => {
        expect(store.displayByCategory).toBeDefined();
    });
});
describe("CRUD product Model", () => {
    it("Should retrive all products", async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: "GTX 1050 TI",
                price: "150",
                category: "graphic-cards",
            },
        ]);
    });
    it("Should retrive specific product", async () => {
        const result = await store.show("1");
        console.log(result);
        expect(result).toEqual({
            id: 1,
            name: "GTX 1050 TI",
            price: "150",
            category: "graphic-cards",
        });
    });
});
describe("Products Endpoints", () => {
    it("Index method will result in 200 status ", async () => {
        const result = await request.get("/products");
        expect(result.status).toBe(200);
    });
    it("Show method will result in status 200", async () => {
        const result = await request.get("/products/1");
        expect(result.status).toBe(200);
    });
    it("Create method will result in status 401 for not having a token", async () => {
        const result = await request.post("/products");
        expect(result.status).toBe(401);
    });
    it("Display by category method will result in status 200", async () => {
        const result = await request.get("/products/categories/graphic-cards");
        expect(result.status).toBe(200);
    });
});
