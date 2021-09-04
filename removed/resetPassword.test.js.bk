const request = require("supertest");
const server = require("../server");
const testUtils = require("../test-utils");
const Users = require("../models/users");
const testUsers = [
  {
    email: "sp172bsed@gmail.com",
    password: "123445",
    confirmPassword: "123445",
    lastName: "ahmed",
    firstName: "zeeshan",
  },
  {
    email: "sp171bsed@gmail.com",
    password: "123445",
    confirmPassword: "123445",
    lastName: "ahmed",
    firstName: "zeeshan",
  },
];

// module.exports = { testUsers };

describe("/register", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  beforeEach(async () => {
    const savedUser = await Users.insertMany(testUsers);
    // testUsers.forEach((user, index) => {
    //   user._id = savedUser[index]._id.toString();
    // });
  });
  afterEach(testUtils.clearDB);
  
  describe("POST /", () => {
    it("verify password was reset", async () => {
        const res = await request(server)
            .post("/password")
            .send({email: testUsers[1].email});
        expect(res.statusCode).toEqual(200);

        const token = (await Users.findOne({email: testUsers[1].email})).resetToken;
        
        const res2 = await request(server)
            .post('/password/new-password')
            .send({password: 1234, confirmPassword: 1234, token: token });
        expect(res2.statusCode).toEqual(200);

        const res3 = await request(server)
            .post('/login')
            .send({email: testUsers[1].email, password: 1234});
        expect(res3.statusCode).toEqual(301);
    });
  });
});