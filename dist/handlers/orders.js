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
        const orders = await store.show(Number(req.body.users_id), Number(req.params.id));
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
        const order = {
            users_id: req.body.users_id,
            status: req.body.status,
        };
        const newOrder = await store.createOrder(order);
        res.json(`Sucessfully created order ${newOrder.id}`);
    }
    catch (err) {
        throw new Error(`An error occured adding your order: ${err}`);
    }
};
const createOrderDetails = async (req, res) => {
    try {
        const product_id = req.body.product_id;
        const order_id = req.params.id;
        const quantity = req.body.quantity;
        const created_at = new Date();
        const newOrder = await store.createOrderDetails(product_id, order_id, quantity, created_at);
        res.json(newOrder);
    }
    catch (err) {
        throw new Error(`An error occured adding your order: ${err}`);
    }
};
const updateOrder = async (req, res) => {
    try {
        const status = req.body.status;
        const order_id = Number(req.params.id);
        const users_id = req.body.users_id;
        //checks order status if it is complete then it cannot be updated
        const checkStatus = await store.show(users_id, order_id);
        if (checkStatus.status == "Complete") {
            res.status(401);
            res.json(`Order is already complete`);
            return;
        }
        const newOrder = await store.update(status, order_id, users_id);
        res.json(newOrder);
    }
    catch (err) {
        throw new Error(`An error occured updating your order: ${err}`);
    }
};
const orders_route = (app) => {
    //gets all user orders
    app.get("/orders", authJWT_1.default.verifyToken, authJWT_1.default.auth, getUserOrders);
    //gets all user orders that are complete
    app.get("/orders/complete", authJWT_1.default.verifyToken, authJWT_1.default.auth, ordersCompleted);
    //gets specific user order
    app.get("/orders/:id", authJWT_1.default.verifyToken, authJWT_1.default.auth, showOrder);
    //create an order
    app.post("/orders", authJWT_1.default.verifyToken, authJWT_1.default.auth, createOrder);
    //create order details
    app.post("/orders/:id/details", authJWT_1.default.verifyToken, createOrderDetails);
    //update users order
    app.put("/orders/:id", authJWT_1.default.verifyToken, authJWT_1.default.auth, updateOrder);
};
exports.default = orders_route;
