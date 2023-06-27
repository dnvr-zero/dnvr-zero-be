import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import router from "../../src/routes/groups.js";

const app = express();

app.use("/groups", router);

// before all the route tests, connect to the database
beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// after all the test, close database connection
afterAll(async () => {
    await mongoose.connection.close();
});

// run tests againts the Groups endpoints by receiving the expected responses
describe("Test the Groups endpoint(s)", () => {
    // test for successful response to a GET request to /groups
    test("GET /groups", async () => {
        const response = await request(app).get("/groups");
        expect(response.statusCode).toBe(200);
    });
});
