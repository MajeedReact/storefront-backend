import app from "../../src/server";
import supertest from "supertest";
import { token } from "../helpers/token";

const request = supertest(app);

describe("User Endpoints", () => {
  it("Create method will result in status 401 for not having a token", async () => {
    const result = await request.post("/users");
    expect(result.status).toBe(401);
  });

  //create user method in order endpoint spec
  it("Index method will result in 401 status for not having a token", async () => {
    const result = await request.get("/users");
    expect(result.status).toBe(401);
  });

  it("Index method should get all users", async () => {
    const result = await request
      .get("/users")
      .set("Authorization", "Bearer " + token);
    expect(result.status).toBe(200);
    expect(result.body).toEqual([
      {
        id: 1,
        firstname: "Jeff",
        lastname: "Bezos",
        email: "test@test.com",
        user_pass: "jeff123",
      },
    ]);
  });

  it("Show method will result in status 401 for not having a token", async () => {
    const result = await request.get("/users/1");
    expect(result.status).toBe(401);
  });

  it("Show method will result in status 200 for having a token", async () => {
    const result = await request
      .get("/users/1")
      .set("Authorization", "Bearer " + token);
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: 1,
      firstname: "Jeff",
      lastname: "Bezos",
      email: "test@test.com",
      user_pass: "jeff123",
    });
  });
});
