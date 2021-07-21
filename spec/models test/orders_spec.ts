import { order, orderStore } from "../../src/models/orders";
import { products, productsStore } from "../../src/models/products";
import { users, usersStore } from "../../src/models/users";

const store = new orderStore();
const product = new productsStore();
const user = new usersStore();

describe("Order Model", () => {
  it(`Should have all active orders by user method`, () => {
    expect(store.orderByUser).toBeDefined();
  });

  it(`Should have show specific users order method`, () => {
    expect(store.show).toBeDefined();
  });

  it(`Should have show update order method`, () => {
    expect(store.update).toBeDefined();
  });

  it(`Should have create order method`, () => {
    expect(store.createOrder).toBeDefined();
  });

  it(`Should have show all completed orders method`, () => {
    expect(store.completedOrders).toBeDefined();
  });

  it(`Should have update order method`, () => {
    expect(store.update).toBeDefined();
  });
});

describe("CRUD Order model", () => {
  //creating order
  it("It should create an order", async () => {
    const result = await store.createOrder({
      users_id: "1",
      status: "Active",
    });
    expect(result).toEqual({
      id: 2,
      users_id: "1",
      status: "Active",
    });
  });

  //creating order details
  it("It should create an order details", async () => {
    const product_id = "1";
    const order_id = "2";
    const quantity = "1";
    const created_at = new Date(2021, 7, 21);

    const result = await store.createOrderDetails(
      product_id,
      order_id,
      quantity,
      created_at
    );
    expect(result).toEqual({
      id: 1,
      product_id: "1",
      order_id: "2",
      quantity: "1",
      created_at: new Date(2021, 7, 21),
    });
  });

  it("It should retrive all orders by user that are active", async () => {
    const result = await store.orderByUser("1");
    expect(result).toEqual([
      {
        id: 2,
        users_id: "1",
        status: "Active",
      },
    ]);
  });

  it("It should update order 2 and retrive all orders that are completed by user", async () => {
    const status = "Complete";
    const order_id = 2;
    const users_id = "1";

    await store.update(status, order_id, users_id);
    const result = await store.completedOrders(users_id);
    expect(result).toEqual([
      {
        id: 1,
        users_id: "1",
        status: "Complete",
      },
      {
        id: 2,
        users_id: "1",
        status: "Complete",
      },
    ]);
  });
});
