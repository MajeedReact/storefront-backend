import client from "../database";

export type order = {
  id?: Number;
  product_id: string;
  quantity: string;
  users_id: string;
  status: string;
};

export class orderStore {
  //get all users active orders
  async orderByUser(user_id: string): Promise<order[]> {
    const conn = await client.connect();
    const sql =
      "SELECT * FROM orders WHERE users_id = $1 AND status = 'Active'";
    const result = await conn.query(sql, [user_id]);

    conn.release();

    const orderByUser = result.rows;
    return orderByUser;
  }

  //show a specific order that's associated with the user
  async show(users_id: string, id: number): Promise<order> {
    const conn = await client.connect();
    const sql = "SELECT * FROM orders WHERE users_id = $1 AND id = $2";
    const result = await conn.query(sql, [users_id, id]);

    conn.release();

    const orderByUser = result.rows[0];
    return orderByUser;
  }

  //create order
  async createOrder(o: order): Promise<order> {
    const conn = await client.connect();
    const sql =
      "INSERT INTO orders(product_id, quantity, users_id, status) VALUES ($1, $2, $3, $4) RETURNING *";
    const result = await conn.query(sql, [
      o.product_id,
      o.quantity,
      o.users_id,
      o.status,
    ]);

    conn.release();

    const newOrder = result.rows[0];

    return newOrder;
  }

  //get all the orders that were completed by the specific user
  async completedOrders(id: string): Promise<order[]> {
    const conn = await client.connect();
    const sql = `SELECT * FROM orders WHERE users_id = $1 AND status = 'Complete'`;
    const result = await conn.query(sql, [id]);

    conn.release();

    const orders = result.rows;
    return orders;
  }

  //update order details
  async update(o: order): Promise<order> {
    try {
      const sql =
        "UPDATE orders SET product_id = $1, quantity = $2, status = $3 WHERE id = $4 AND users_id = $5 RETURNING *";

      const conn = await client.connect();

      const result = await conn.query(sql, [
        o.product_id,
        o.quantity,
        o.status,
        o.id,
        o.users_id,
      ]);

      const order = result.rows[0];

      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not update order with the id ${o.id}: ${err}`);
    }
  }
}
