import { users, usersStore } from "../../src/models/users";

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
  //I had to create a method without hashing passwords because I cannot predict what is the outcome of the hash
  it("it should create a user", async () => {
    const result = await store.createWithoutHash({
      firstname: "Jeff",
      lastname: "Bezos",
      email: "test@test.com",
      user_pass: "jeff123",
    });
    expect(result).toEqual({
      id: 2,
      firstname: "Jeff",
      lastname: "Bezos",
      email: "test@test.com",
      user_pass: "jeff123",
    });
  });

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
      {
        id: 2,
        firstname: "Jeff",
        lastname: "Bezos",
        email: "test@test.com",
        user_pass: "jeff123",
      },
    ]);
  });

  it("Should retrive specific user", async () => {
    const result = await store.show("2");
    console.log(result);
    expect(result).toEqual({
      id: 2,
      firstname: "Jeff",
      lastname: "Bezos",
      email: "test@test.com",
      user_pass: "jeff123",
    });
  });
});
