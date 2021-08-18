const request = require("supertest");
var jwt = require('jsonwebtoken');

const server = require("../server");
const testUtils = require('../test-utils');

const User = require('../models/user');

describe("/login", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    const testUser = {
        email: "testUser0@mail.com",
        password: "testPassword"
    };

    const adminUser = {
        email: "adminUser@mail.com",
        password: "adminPassword",
        role: "admin"
    };

    
})