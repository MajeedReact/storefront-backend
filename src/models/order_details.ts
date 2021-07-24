import client from "../database";

export type order_detail = {
  id?: Number;
  product_id: string;
  order_id: string;
  quantity: string;
  created_at: Date;
};

export class order_detailsStore {
  //get all order details
  async index(): Promise<order_detail[]> {
    try {
      const conn = await client.connect();

      const sql = "SELECT * FROM order_details";
      const result = await conn.query(sql);
      const order_details = result.rows;
      conn.release();

      return order_details;
    } catch (err) {
      throw new Error(`An error occured retriving order details`);
    }
  }
  //create order details
  async create(
    product_id: string,
    order_id: string,
    quantity: string,
    created_at: Date
  ): Promise<order_detail> {
    const conn = await client.connect();
    const sql =
      "INSERT INTO order_details(product_id, order_id, quantity, created_at) VALUES ($1, $2, $3, $4) RETURNING *";
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
}
