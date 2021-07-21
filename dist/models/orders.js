"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
const database_1 = __importDefault(require("../database"));
class orderStore {
    //get all users active orders
    async orderByUser(user_id) {
        const conn = await database_1.default.connect();
        const sql = "SELECT * FROM orders WHERE users_id = $1 AND status = 'Active'";
        const result = await conn.query(sql, [user_id]);
        conn.release();
        const orderByUser = result.rows;
        return orderByUser;
    }
    //show a specific order that's associated with the user
    async show(users_id, id) {
        const conn = await database_1.default.connect();
        const sql = "SELECT * FROM orders WHERE users_id = $1 AND id = $2";
        const result = await conn.query(sql, [users_id, id]);
        conn.release();
        const orderByUser = result.rows[0];
        return orderByUser;
    }
    //create order
    async createOrder(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO orders(users_id, status) VALUES ($1, $2) RETURNING *";
            const result = await conn.query(sql, [o.users_id, o.status]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`An Error occured creating your order: ${err}`);
        }
    }
    //create order details
    async createOrderDetails(product_id, order_id, quantity, created_at) {
        try {
            const conn = await database_1.default.connect();
            const sqlCheck = "SELECT * FROM orders WHERE id = $1";
            const resultCheck = await conn.query(sqlCheck, [order_id]);
            const order = resultCheck.rows[0];
            if (order.status === "Complete") {
                throw new Error(`Could not add product to a complete order`);
            }
            const sql = "INSERT INTO order_details(product_id, order_id, quantity, created_at) VALUES ($1, $2, $3, $4) RETURNING *";
            const result = await conn.query(sql, [
                product_id,
                order_id,
                quantity,
                created_at,
            ]);
            conn.release();
            const newOrder = result.rows[0];
            return newOrder;
        }
        catch (err) {
            throw new Error(`An Error occured adding a product into your order: ${err}`);
        }
    }
    //get all the orders that were completed by the specific user
    async completedOrders(id) {
        const conn = await database_1.default.connect();
        const sql = `SELECT * FROM orders WHERE users_id = $1 AND status = 'Complete'`;
        const result = await conn.query(sql, [id]);
        conn.release();
        const orders = result.rows;
        return orders;
    }
    //update order details
    async update(status, order_id, users_id) {
        try {
            const sql = "UPDATE orders SET status = $1 WHERE id = $2 AND users_id = $3 RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [status, order_id, users_id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not update order with the id ${order_id}: ${err}`);
        }
    }
}
exports.orderStore = orderStore;
