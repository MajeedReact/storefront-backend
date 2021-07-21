import app from "../../src/server";
import supertest from "supertest";

const request = supertest(app);

describe("Creating user and products", () => {
  it("Create user method will result in status 200 for having a token", async () => {
    //I used a route for testing purposes
    const result = await request
      .post("/users/test")
      .set("Authorization", "Bearer " + process.env.JWT_TOKEN)
      .send({
        id: 1,
        firstname: "Jeff",
        lastname: "Bezos",
        email: "test@test.com",
        user_pass: "jeff123",
      });
    expect(result.status).toBe(200);
    expect(result.body).toEqual("Sucessfully registered Jeff");
  });

  it("Create product method will result in status 200 for having a token", async () => {
    const result = await request
      .post("/products")
      .set("Authorization", "Bearer " + process.env.JWT_TOKEN)
      .send({
        id: 1,
        name: "GTX 1050 TI",
        price: "150",
        category: "graphic-cards",
      });
    expect(result.status).toBe(200);
    expect(result.body).toEqual("Sucessfully created product GTX 1050 TI");
  });
});

describe("Orders Endpoint", () => {
  it("Create method will result in status 200 for having a token", async () => {
    const result = await request.post("/orders");
    expect(result.status).toBe(401);
  });

  it("Create method will result in status 200 for having a token", async () => {
    const result = await request
      .post("/orders")
      .set("Authorization", "Bearer " + process.env.JWT_TOKEN)
      .send({
        id: 1,
        users_id: "1",
        status: "Active",
      });
    expect(result.status).toBe(200);
    expect(result.body).toEqual("Sucessfully created order 1");
  });

  it("It should not display active orders when the user does not have token", async () => {
    const result = await request.get("/orders");
    expect(result.status).toBe(401);
  });

  it("It should display active orders when the user have token", async () => {
    const result = await request
      .get("/orders")
      .set("Authorization", "Bearer " + process.env.JWT_TOKEN)
      .send({
        users_id: "1",
      });
    expect(result.status).toBe(200);
    expect(result.body).toEqual([
      {
        id: 1,
        users_id: "1",
        status: "Active",
      },
    ]);
  });

  it("It should not gets specific user order when the user does not have token", async () => {
    const result = await request.get("/orders/1");
    expect(result.status).toBe(401);
  });

  it("It should gets specific user order when the user have token", async () => {
    const result = await request
      .get("/orders/1")
      .set("Authorization", "Bearer " + process.env.JWT_TOKEN)
      .send({
        users_id: "1",
      });
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: 1,
      users_id: "1",
      status: "Active",
    });
  });

  it("It should not update orders when the user does not have token", async () => {
    const result = await request.put("/orders/1");
    expect(result.status).toBe(401);
  });

  it("It should update orders when the user have token", async () => {
    const result = await request
      .put("/orders/1")
      .set("Authorization", "Bearer " + process.env.JWT_TOKEN)
      .send({
        id: 1,
        users_id: "1",
        status: "Complete",
      });
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: 1,
      users_id: "1",
      status: "Complete",
    });
  });

  it("It should not display completed orders when the user does not have token", async () => {
    const result = await request.get("/orders/completed");
    expect(result.status).toBe(401);
  });

  it("It should display completed orders when the user have token", async () => {
    const result = await request
      .get("/orders/complete")
      .set("Authorization", "Bearer " + process.env.JWT_TOKEN)
      .send({
        users_id: "1",
      });
    expect(result.status).toBe(200);
    expect(result.body).toEqual([
      {
        id: 1,
        users_id: "1",
        status: "Complete",
      },
    ]);
  });

  it("It should not update order because the order is already complete", async () => {
    const result = await request
      .put("/orders/1")
      .set("Authorization", "Bearer " + process.env.JWT_TOKEN)
      .send({
        id: 1,
        users_id: "1",
        status: "Complete",
      });
    expect(result.status).toBe(401);
    expect(result.body).toEqual("Order is already complete");
  });
});
