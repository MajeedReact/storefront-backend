import express, { Request, Response } from "express";
import { products, productsStore } from "../models/products";
import authJWT from "../middlewares/authJWT";

const store = new productsStore();

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  const product = await store.index();
  res.json(product);
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const product: products = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  try {
    const newProduct = await store.create(product);
    res.json(`Sucessfully created product ${newProduct.name}`);
  } catch (err) {
    throw new Error(
      `An error occured creating product ${product.name}: ${err}`
    );
  }
};

const showProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await store.show(req.params.id);
    if (product === null) {
      res.status(404);
      res.json("Not found");
      return;
    } else {
      res.json(product);
    }
  } catch (err) {
    throw new Error(`An Error occured retriving the product: ${err}`);
  }
};

const displayByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  //example:  /products/categories/motherboards
  const product = await store.displayByCategory(req.params.category);
  console.log(req.params.category);
  res.json(product);
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await store.destroy(req.body.id);
    res.json(`Sucessfully removed ${product.name}`);
  } catch (err) {
    throw new Error(`An Error occured removing the product: ${err}`);
  }
};

const products_route = (app: express.Application) => {
  //get all products
  app.get("/products", getAllProducts);
  //get specific product
  app.get("/products/:id", showProduct);
  //get products by category
  app.get("/products/categories/:category", displayByCategory);
  //create a product
  app.post("/products", authJWT.verifyToken, createProduct);
  //remove a product by id
  app.delete("/products", authJWT.verifyToken, destroy);
};

export default products_route;
