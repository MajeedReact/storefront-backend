"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const authJWT_1 = __importDefault(require("../middlewares/authJWT"));
const store = new products_1.productsStore();
const getAllProducts = async (req, res) => {
    const product = await store.index();
    res.json(product);
};
const createProduct = async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const newProduct = await store.create(product);
        res.json(`Sucessfully created product ${newProduct.name}`);
    }
    catch (err) {
        throw new Error(`An error occured creating product ${product.name}: ${err}`);
    }
};
const showProduct = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        if (product === null) {
            res.status(404);
            res.json("Not found");
            return;
        }
        else {
            res.json(product);
        }
    }
    catch (err) {
        throw new Error(`An Error occured retriving the product: ${err}`);
    }
};
const displayByCategory = async (req, res) => {
    //example:  /products/categories/motherboards
    const product = await store.displayByCategory(req.params.category);
    res.json(product);
};
const destroy = async (req, res) => {
    try {
        const product = await store.destroy(req.body.id);
        res.json(`Sucessfully removed ${product.name}`);
    }
    catch (err) {
        throw new Error(`An Error occured removing the product: ${err}`);
    }
};
const products_route = (app) => {
    //get all products
    app.get("/products", getAllProducts);
    //get specific product
    app.get("/products/:id", showProduct);
    //get products by category
    app.get("/products/categories/:category", displayByCategory);
    //create a product
    app.post("/products", authJWT_1.default.verifyToken, createProduct);
    //remove a product by id
    app.delete("/products", authJWT_1.default.verifyToken, destroy);
};
exports.default = products_route;
