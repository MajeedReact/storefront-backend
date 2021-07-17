"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const authJWT_1 = __importDefault(require("../middlewares/authJWT"));
const store = new orders_1.orderStore();
const getUserOrders = async (req, res) => {
    try {
        const orders = await store.orderByUser(req.body.users_id);
        res.json(orders);
    }
    catch (err) {
        throw new Error(`An error occured retriving your orders: ${err}`);
    }
};
const showOrder = async (req, res) => {
    try {
        const orders = await store.show(req.body.users_id, req.params.id);
        res.json(orders);
    }
    catch (err) {
        throw new Error(`An error occured retriving your order: ${err}`);
    }
};
const ordersCompleted = async (req, res) => {
    try {
        const orders = await store.completedOrders(req.body.users_id);
        res.json(orders);
    }
    catch (err) {
        throw new Error(`An error occured retriving your orders: ${err}`);
    }
};
const createOrder = async (req, res) => {
    try {
        const orders = {
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            users_id: req.body.users_id,
            status: req.body.status,
        };
        const newOrder = await store.createOrder(orders);
        res.json(newOrder);
    }
    catch (err) {
        throw new Error(`An error occured adding your order: ${err}`);
    }
};
const updateOrder = async (req, res) => {
    try {
        const orders = {
            id: Number(req.params.id),
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            users_id: req.body.users_id,
            status: req.body.status,
        };
        //checks order status if it is complete then it cannot be updated
        const checkStatus = await store.show(orders.users_id, orders.id);
        if (checkStatus.status == "Complete") {
            res.status(401);
            res.json(`Order is already complete`);
            return;
        }
        const newOrder = await store.update(orders);
        console.log(newOrder);
        res.json(newOrder);
    }
    catch (err) {
        throw new Error(`An error occured updating your order: ${err}`);
    }
};
const orders_route = (app) => {
    //gets all user orders that are active
    app.get("/orders", authJWT_1.default.verifyToken, authJWT_1.default.auth, getUserOrders);
    //gets all user orders that are complete
    app.get("/orders/complete", authJWT_1.default.verifyToken, authJWT_1.default.auth, ordersCompleted);
    //gets specific user order
    app.get("/orders/:id", authJWT_1.default.verifyToken, authJWT_1.default.auth, showOrder);
    //create an order
    app.post("/orders", authJWT_1.default.verifyToken, createOrder);
    //update users order
    app.put("/orders/:id", authJWT_1.default.verifyToken, authJWT_1.default.auth, updateOrder);
};
exports.default = orders_route;
