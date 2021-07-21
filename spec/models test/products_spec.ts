import { products, productsStore } from "../../src/models/products";

const store = new productsStore();

describe("products Model", () => {
  it(`Should have get all products method`, () => {
    expect(store.index).toBeDefined();
  });

  it(`Should have show specific products method`, () => {
    expect(store.show).toBeDefined();
  });

  it(`Should have delete product method`, () => {
    expect(store.destroy).toBeDefined();
  });

  it(`Should have create products method`, () => {
    expect(store.destroy).toBeDefined();
  });

  it(`Should have get products by category method`, () => {
    expect(store.displayByCategory).toBeDefined();
  });
});

describe("CRUD product Model", () => {
  it("it should create a product", async () => {
    const result = await store.create({
      name: "GTX 1050 TI",
      price: "150",
      category: "graphic-cards",
    });
    expect(result).toEqual({
      id: 2,
      name: "GTX 1050 TI",
      price: "150",
      category: "graphic-cards",
    });
  });

  it("Should retrive all products", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "GTX 1050 TI",
        price: "150",
        category: "graphic-cards",
      },
      {
        id: 2,
        name: "GTX 1050 TI",
        price: "150",
        category: "graphic-cards",
      },
    ]);
  });

  it("Should retrive specific product", async () => {
    const result = await store.show("1");
    console.log(result);
    expect(result).toEqual({
      id: 1,
      name: "GTX 1050 TI",
      price: "150",
      category: "graphic-cards",
    });
  });

  it("Should retrive all products from a specific category", async () => {
    const result = await store.displayByCategory("graphic-cards");
    console.log(result);
    expect(result).toEqual([
      {
        id: 1,
        name: "GTX 1050 TI",
        price: "150",
        category: "graphic-cards",
      },
      {
        id: 2,
        name: "GTX 1050 TI",
        price: "150",
        category: "graphic-cards",
      },
    ]);
  });
});
