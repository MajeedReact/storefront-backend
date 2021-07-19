import { users, usersStore } from "../users";
import app from "../../server";
import supertest from "supertest";

const request = supertest(app);
const store = new usersStore();

describe("User Model", () => {
  it(`Get all users method should be defined`, () => {
    expect(store.index).toBeDefined();
  });

  it(`Should have show specific users method`, () => {
    expect(store.show).toBeDefined();
  });

  it(`Should have delete user method`, () => {
    expect(store.destroy).toBeDefined();
  });

  it(`Should have create users method`, () => {
    expect(store.create).toBeDefined();
  });
});

describe("CRUD user Model", () => {
  it("Should retrive all users", async () => {
    const result = await store.index();
    console.log(result);
    expect(result).toEqual([
      {
        id: 1,
        firstname: "Jeff",
        lastname: "Bezos",
        email: "test@test.com",
        user_pass: "jeff123",
      },
    ]);
  });

  it("Should retrive specific user", async () => {
    const result = await store.show("1");
    console.log(result);
    expect(result).toEqual({
      id: 1,
      firstname: "Jeff",
      lastname: "Bezos",
      email: "test@test.com",
      user_pass: "jeff123",
    });
  });
});

describe("User Endpoints", () => {
  it("Index method will result in 401 status for not having a token", async () => {
    const result = await request.get("/users");
    expect(result.status).toBe(401);
  });

  it("Show method will result in status 401 for not having a token", async () => {
    const result = await request.get("/users/1");
    expect(result.status).toBe(401);
  });

  it("Create method will result in status 200", async () => {
    const result = await request.post("/users");
    expect(result.status).toBe(200);
  });
});
