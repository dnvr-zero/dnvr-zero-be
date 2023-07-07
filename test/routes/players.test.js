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
    await mongoose.connect(process.env.TEST_DB_CONNECTION, {
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
        expect(response.body.length >= 0).toBe(true);
    });

    // test for successful response to a POST request to /players
    test("POST /players", async () => {
        // appends integer to username to avoid unique validators, if any
        testFields.username += Date.now().toString();

        // send request to create a temp document
        const response = await request(app).post("/players").send(testFields);
        expect(response.statusCode).toBe(201);

        // confirm a player document was created by checking id
        expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBe(true);

        // confirm the player created used the test fields
        expect(response.body.username).toBe(testFields.username);

        // delete the temp document that was created for this test
        await Model.deleteOne({ _id: response.body._id });
    });

    // test for successful response to a GET request to /players/id
    test("GET /players/id", async () => {
        const requestedID = testPlayer._id.toString();

        // send request to get the test player that was just created
        const response = await request(app).get(`/players/${requestedID}`);
        expect(response.statusCode).toBe(200);

        const receivedID = response.body._id.toString();
        // confirm the player document received in response is the document requested
        expect(receivedID).toBe(requestedID);
    });

    // test for successful response to a PATCH request to /players/id
    test("PATCH /players/id", async () => {
        const updatePlayer = { username: "this updated user should not exist" };

        // send request to update username of the test player
        const response = await request(app)
            .patch(`/players/${testPlayer.id}`)
            .send(updatePlayer);
        expect(response.statusCode).toBe(200);

        // confirm the request to update one document was executed
        expect(response.body.acknowledged).toBe(true);
        expect(response.body.modifiedCount).toBe(1);
    });

    // test for successful response to a DELETE request to /players/id
    test("DELETE /players/id", async () => {
        const requestedID = testPlayer._id.toString();

        // send request to delete the test player
        const response = await request(app).delete(`/players/${requestedID}`);
        expect(response.statusCode).toBe(200);

        // confirm the request to delete one document was executed
        expect(response.body.acknowledged).toBe(true);
        expect(response.body.deletedCount).toBe(1);
    });
});
