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
      req.body.users_id,
      req.params.id as unknown as number
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
    const orders: order = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      users_id: req.body.users_id,
      status: req.body.status,
    };

    const newOrder = await store.createOrder(orders);
    res.json(newOrder);
  } catch (err) {
    throw new Error(`An error occured adding your order: ${err}`);
  }
};

const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders: order = {
      id: Number(req.params.id),
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      users_id: req.body.users_id,
      status: req.body.status,
    };

    //checks order status if it is complete then it cannot be updated
    const checkStatus = await store.show(orders.users_id, orders.id as number);
    if (checkStatus.status == "Complete") {
      res.status(401);
      res.json(`Order is already complete`);
      return;
    }

    const newOrder = await store.update(orders);
    console.log(newOrder);
    res.json(newOrder);
  } catch (err) {
    throw new Error(`An error occured updating your order: ${err}`);
  }
};

const orders_route = (app: express.Application) => {
  //gets all user orders that are active
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
  app.post("/orders", authJWT.verifyToken, createOrder);
  //update users order
  app.put("/orders/:id", authJWT.verifyToken, authJWT.auth, updateOrder);
};

export default orders_route;
