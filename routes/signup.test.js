  
const request = require("supertest");
var jwt = require('jsonwebtoken');

const server = require("../index");
const testUtils = require('../test-utils');

const User = require('../models/user');

describe("/signup", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testUser@mail.com',
      password: 'testUserPassword'
  };
  const adminUser = {
      firstName: 'Admin',
      lastName: 'User',
      email: 'adminUser@mail.com',
      password: 'adminUserPassword'
  }

  describe("fail before signup", () => {
    describe("POST /", () => {
      it("should return 401", async () => {
        const res = await request(server).post("/signup").send(testUser);
        expect(res.statusCode).toEqual(401);
      });
    });

    describe("POST /resetPassword", () => {
      it("should return 401", async () => {
        const res = await request(server).post("/login/password").send(testUser);
        expect(res.statusCode).toEqual(401);
      });
    });
  });
  
  describe("fail signup due to missing element ", () => {
    describe("POST /signup", () => {
      it("should return 400 without a password", async () => {
        const res = await request(server).post("/signup").send({
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            email: testUser.email
        });
        expect(res.statusCode).toEqual(400);
      });
      it("should return 400 without a firstName", async () => {
        const res = await request(server).post("/signup").send({
            lastName: testUser.lastName,
            email: testUser.email
        });
        expect(res.statusCode).toEqual(400);
      });
      it("should return 400 without a lastName", async () => {
        const res = await request(server).post("/signup").send({
            firstName: testUser.firstName,
            email: testUser.email
        });
        expect(res.statusCode).toEqual(400);
      });
      it("should return 400 without an email", async () => {
        const res = await request(server).post("/signup").send({
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            password: testUser.password
        });
        expect(res.statusCode).toEqual(400);
      });
    });
  });

  describe("fail signup due to empty element ", () => {
    describe("POST /signup", () => {
      it("should return 400 with empty password", async () => {
        const res = await request(server).post("/signup").send({
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            email: testUser.email,
            password: ''
        });
        expect(res.statusCode).toEqual(400);
      });
      it("should return 400 with empty firstName", async () => {
        const res = await request(server).post("/signup").send({
            firstName: '',
            lastName: testUser.lastName,
            email: testUser.email,
            password: testUser.password
        });
        expect(res.statusCode).toEqual(400);
      });
      it("should return 400 with empty lastName", async () => {
        const res = await request(server).post("/signup").send({
            firstName: testUser.firstName,
            lastName: '',
            email: testUser.email,
            password: testUser.password
        });
        expect(res.statusCode).toEqual(400);
      });
      it("should return 400 with empty email", async () => {
        const res = await request(server).post("/signup").send({
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            email: '',
            password: testUser.password
        });
        expect(res.statusCode).toEqual(400);
      });
    });
  });

  describe.each([testUser, adminUser])("User %#", (user) => {
    it("should return 200", async () => {
        const res = await request(server).post("/signup").send(user);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual('Admin saved');
      });
  });
});