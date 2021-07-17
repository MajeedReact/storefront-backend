import { QueryResult } from "pg";
import client from "../database";

export type products = {
  id?: Number;
  name: string;
  price: string;
  category: string;
};

export class productsStore {
  //get all products
  async index(): Promise<products[]> {
    const conn = await client.connect();
    const sql = "SELECT * FROM products";

    const result = await conn.query(sql);

    conn.release();

    const products = result.rows;

    return products;
  }

  //create a product
  async create(p: products): Promise<products> {
    const conn = await client.connect();
    const sql =
      "INSERT INTO products(name, price, category) VALUES ($1, $2, $3) RETURNING *";
    const result = await conn.query(sql, [p.name, p.price, p.category]);

    conn.release();

    const product = result.rows[0];

    return product;
  }

  //get a specific product
  async show(id: string): Promise<products | null> {
    const conn = await client.connect();
    const sql = "SELECT * FROM products WHERE id = $1";
    const result: QueryResult = await conn.query(sql, [id]);

    conn.release();

    const product = result.rows[0];
    //checking if we get a result return it.  If we don't get a result return null so we can display not found
    if (result.rows.length <= 0) {
      return null;
    }

    return product;
  }

  //display products by category
  async displayByCategory(category: string): Promise<products[]> {
    const conn = await client.connect();
    const sql = "SELECT * FROM products WHERE category = $1";

    const result = await conn.query(sql, [category]);

    conn.release();

    const products = result.rows;

    return products;
  }

  //remove a product
  async destroy(id: string): Promise<products> {
    const conn = await client.connect();
    const sql = "DELETE FROM Products WHERE id = $1";

    const result = await conn.query(sql, [id]);

    conn.release();
    const product = result.rows[0];
    return product;
  }
}
