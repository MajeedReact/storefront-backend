import express, { Request, Response } from "express";
import { order, orderStore } from "../models/orders";
import authJWT from "../middlewares/authJWT";

const store = new orderStore();

const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.orderByUser(req.body.users_id);
    res.json(orders);
  } catch (err) {
    throw new Error(`An error occured retriving your orders: ${err}`);
  }
};

const showOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.show(
      Number(req.body.users_id),
      Number(req.params.id)
    );
    res.json(orders);
  } catch (err) {
    throw new Error(`An error occured retriving your order: ${err}`);
  }
};
const ordersCompleted = async (req: Request, res: Response) => {
  try {
    const orders = await store.completedOrders(req.body.users_id);
    res.json(orders);
  } catch (err) {
    throw new Error(`An error occured retriving your orders: ${err}`);
  }
};

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: order = {
      users_id: req.body.users_id,
      status: req.body.status,
    };

    const newOrder = await store.createOrder(order);
    res.json(`Sucessfully created order ${newOrder.id}`);
  } catch (err) {
    throw new Error(`An error occured adding your order: ${err}`);
  }
};

const createOrderDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product_id = req.body.product_id;
    const order_id = req.params.id;
    const quantity = req.body.quantity;
    const created_at = new Date();
    const newOrder = await store.createOrderDetails(
      product_id,
      order_id,
      quantity,
      created_at
    );

    res.json(newOrder);
  } catch (err) {
    throw new Error(`An error occured adding your order: ${err}`);
  }
};

const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const status: string = req.body.status;
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
  } catch (err) {
    throw new Error(`An error occured updating your order: ${err}`);
  }
};

const orders_route = (app: express.Application) => {
  //gets all user orders
  app.get("/orders", authJWT.verifyToken, authJWT.auth, getUserOrders);
  //gets all user orders that are complete
  app.get(
    "/orders/complete",
    authJWT.verifyToken,
    authJWT.auth,
    ordersCompleted
  );
  //gets specific user order
  app.get("/orders/:id", authJWT.verifyToken, authJWT.auth, showOrder);
  //create an order
  app.post("/orders", authJWT.verifyToken, authJWT.auth, createOrder);
  //create order details
  app.post("/orders/:id/details", authJWT.verifyToken, createOrderDetails);
  //update users order
  app.put("/orders/:id", authJWT.verifyToken, authJWT.auth, updateOrder);
};

export default orders_route;
