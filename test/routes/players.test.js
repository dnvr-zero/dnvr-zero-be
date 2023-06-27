import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import router from "../../src/routes/players";
import Model from "../../src/models/Players";

const app = express();

app.use(express.json());
app.use("/players", router);

// before all the route tests, connect to the database
beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// after all the test, close database connection
afterAll(async () => {
    await mongoose.connection.close();
});

// test player to be used for endpoints that need to reference a document in the database
let testPlayer;
const testFields = {
    username: "this user should not exist",
    level: "0",
    score: "00",
    email: "test@email.com",
    groupID: "0",
};

// before each test, create a temp test player
beforeEach(async () => {
    testPlayer = await Model.create(testFields);
});

// after each test, delete the temp test player
afterEach(async () => {
    await Model.deleteOne({ _id: testPlayer._id });
});

// run tests againts the players endpoints by receiving the expected responses
describe("Test the players endpoint(s)", () => {
    // test for successful response to a GET request to /players
    test("GET /players", async () => {
        const response = await request(app).get("/players");
        expect(response.statusCode).toBe(200);
    });

    // test for successful response to a POST request to /players
    test("POST /players", async () => {
        // appends integer to username to avoid unique validators, if any
        testFields.username += Date.now().toString();

        // send request to create a temp document
        const response = await request(app).post("/players").send(testFields);
        expect(response.statusCode).toBe(201);

        // delete the temp document that was created for this test
        await Model.deleteOne({ _id: response.body._id });
    });

    // test for successful response to a GET request to /players/id
    test("GET /players/id", async () => {
        // send request to get the test player that was just created
        const response = await request(app).get(`/players/${testPlayer._id}`);
        expect(response.statusCode).toBe(200);
    });

    // test for successful response to a PATCH request to /players/id
    test("PATCH /players/id", async () => {
        const updatePlayer = { username: "this updated user should not exist" };

        // send request to update username of the test player
        const response = await request(app)
            .patch(`/players/${testPlayer.id}`)
            .send(updatePlayer);
        expect(response.statusCode).toBe(200);
    });

    // test for successful response to a DELETE request to /players/id
    test("DELETE /players/id", async () => {
        // send request to delete the test player
        const response = await request(app).delete(
            `/players/${testPlayer._id}`
        );
        expect(response.statusCode).toBe(200);
    });
});
