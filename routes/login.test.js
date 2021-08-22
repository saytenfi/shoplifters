  
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

    describe("POST /password", () => {
      it("should return 401", async () => {
        const res = await request(server).post("/resetPassword").send(user0);
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

  // describe("After both users login", () => {

  //   beforeEach(async () => {
  //     await request(server).post("/register/signup").send(user0);
  //     const res0 = await request(server).post("/login").send({
  //       email: user0.email,
  //       password: user0.password
  //     });
  
  //     await request(server).post("/register/signup").send(user1);
  //     const res1 = await request(server).post("/login").send({
  //       email: user1.email,
  //       password: user1.password
  //     });
  //   });

  //   describe("POST /password", () => {
  //     it("should reject bogus token", async () => {
  //       const res = await request(server)
  //         .post("/login/password")
  //         .set('Authorization', 'Bearer BAD')
  //         .send({ password: '123' });
  //       expect(res.statusCode).toEqual(401);
  //     });
  //     it("should reject empty password", async () => {
  //       const res = await request(server)
  //         .post("/login/password")
  //         .set('Authorization', 'Bearer ' + token0)
  //         .send({ password: '' });
  //       expect(res.statusCode).toEqual(400);
  //     });
  //     it("should change password for user0", async () => {
  //       const res = await request(server)
  //         .post("/login/password")
  //         .set('Authorization', 'Bearer ' + token0)
  //         .send({ password: '123' });
  //       expect(res.statusCode).toEqual(200);
  //       let loginRes0 = await request(server).post("/login").send(user0);
  //       expect(loginRes0.statusCode).toEqual(401);
  //       loginRes0 = await request(server).post("/login").send({
  //         email: user0.email,
  //         password: '123'
  //       });
  //       expect(loginRes0.statusCode).toEqual(200);
  //       const loginRes1 = await request(server).post("/login").send(user1);
  //       expect(loginRes1.statusCode).toEqual(200);
  //     });
  //     it("should change password for user1", async () => {
  //       const res = await request(server)
  //         .post("/login/password")
  //         .set('Authorization', 'Bearer ' + token1)
  //         .send({ password: '123' });
  //       expect(res.statusCode).toEqual(200);
  //       const loginRes0 = await request(server).post("/login").send(user0);
  //       expect(loginRes0.statusCode).toEqual(200);
  //       let loginRes1 = await request(server).post("/login").send(user1);
  //       expect(loginRes1.statusCode).toEqual(401);
  //       loginRes1 = await request(server).post("/login").send({
  //         email: user1.email,
  //         password: '123'
  //       });
  //       expect(loginRes1.statusCode).toEqual(200);
  //     });
     
  //   }); 
  // });
});
