  
const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');

const User = require('../models/users');

describe("/login", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  const user0 = {
    firstName: "testUser001",
    lastName: "user",
    email: 'user0@mail.com',
    password: 'S1VXFfiq5Q3QrswpYpwW',
    confirmPassword: 'S1VXFfiq5Q3QrswpYpwW'
  };
  const user1 = {
    firstName: "testUser002",
    lastName: "user",
    email: 'user1@mail.com',
    password: 'b5Or69JWohGXDgCU3xba',
    confirmPassword: 'b5Or69JWohGXDgCU3xba'
  }

  describe("before signup", () => {
    describe("POST /", () => {
      it("should return 401", async () => {
        const res = await request(server).post("/login").send(user0);
        expect(res.statusCode).toEqual(401);
      });
    });
  });  

  describe.each([user0, user1])("User %# after signup", (user) => {
    beforeEach(async () => {
      await request(server).post("/register/signup").send(user0);
      await request(server).post("/register/signup").send(user1);
    });

    describe("POST /", () => {
      it("should return 400 when password isn't provided", async () => {
        const res = await request(server).post("/login").send({
          email: user.email
        });
        expect(res.statusCode).toEqual(400);
      });
      it("should return 401 when password doesn't match", async () => {
        const res = await request(server).post("/login").send({
          email: user.email,
          password: 'Not Match'
        });
        expect(res.statusCode).toEqual(401);
      });
      it("should return 302 for successful login", async () => {
        const res = await request(server).post("/login").send({
          email: user.email,
          password: user.password
        });
        expect(res.statusCode).toEqual(302);
      });
    });
  });
});
