import app from "../../src/server";
import supertest from "supertest";

const request = supertest(app);

describe("Products Endpoints", () => {
  it("Create method will result in status 401 for not having a token", async () => {
    const result = await request.post("/products");
    expect(result.status).toBe(401);
  });

  //create product method in order endpoint spec
  it("Index method will result in 200 status and get all products ", async () => {
    const result = await request.get("/products");
    expect(result.status).toBe(200);
    expect(result.body).toEqual([
      {
        id: 1,
        name: "GTX 1050 TI",
        price: "150",
        category: "graphic-cards",
      },
    ]);
  });

  it("Show method will result in status 200 and get specific product", async () => {
    const result = await request.get("/products/1");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: 1,
      name: "GTX 1050 TI",
      price: "150",
      category: "graphic-cards",
    });
  });

  it("Create method will result in status 401 for not having a token", async () => {
    const result = await request.post("/products");
    expect(result.status).toBe(401);
  });

  it("Display by category method will result in status 200 and get all products in that category", async () => {
    const result = await request.get("/products/categories/graphic-cards");
    expect(result.status).toBe(200);
    expect(result.body).toEqual([
      {
        id: 1,
        name: "GTX 1050 TI",
        price: "150",
        category: "graphic-cards",
      },
    ]);
  });
});
