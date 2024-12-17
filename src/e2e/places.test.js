const request = require("supertest");
const createApp = require("../createApp");
const mongoose = require("mongoose");
require("dotenv").config();

describe("/api/places", () => {
  let app;
  beforeAll(async () => {
    //connecting to mongo
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));

    app = createApp();
  });

  it("should return all places", async () => {
    const response = await request(app).get("/api/places/getAll");
    expect(response.statusCode).toBe(200);
  });

  it("should return place by id", async () => {
    const id = "660880f28747cd9210f22d04";
    const response = await request(app).get(`/api/places/id/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id", id);
    expect(response.body).toHaveProperty(
      "address",
      "1104 Elder Ave, Bronx, NY, 10472"
    );
    expect(response.body).toHaveProperty("borough", "Bronx");
    expect(response.body).toHaveProperty("contact", "(347) 235-3723");
  });

  it("should throw error if place by id is invalid", async () => {
    // Use an invalid ObjectId
    const invalidId = "123";
    const response = await request(app).get(`/api/places/id/${invalidId}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Invalid ID format" });
  });

  it("should throw error if place by id not found", async () => {
    // Use a fake ObjectId
    const fakeId = "60a7b1a2f6f5e6a41b9b6c23";
    const response = await request(app).get(`/api/places/id/${fakeId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Place not found" });
  });

  it("should return places by borough", async () => {
    const borough = "Manhattan";
    const response = await request(app).get(`/api/places/borough/${borough}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((place) => {
      expect(place.borough).toBe(borough);
    });
  });

  it("should throw error if place by borough not found", async () => {
    const fakeBorough = "FakeBorough";
    const response = await request(app).get(
      `/api/places/borough/${fakeBorough}`
    );
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Places not found" });
  });

  it("should return places by tag", async () => {
    const tag = "Halal";
    const response = await request(app).get(`/api/places/tags/${tag}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((place) => {
      expect(place.tags).toContain(tag);
    });
  });

  it("should throw error if place by tag not found", async () => {
    const fakeTag = "FakeTag";
    const response = await request(app).get(`/api/places/tags/${fakeTag}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Places not found" });
  });

  it("should return places with food_pantry", async () => {
    const response = await request(app).get("/api/places/type/food_pantry");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((place) => {
      expect(place.hours).toHaveProperty("food_pantry");
      expect(place.hours.food_pantry).toBeInstanceOf(Object);
    });
  });

  it("should return places with soup_kitchen", async () => {
    const response = await request(app).get("/api/places/type/soup_kitchen");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((place) => {
      expect(place.hours).toHaveProperty("soup_kitchen");
      expect(place.hours.soup_kitchen).toBeInstanceOf(Object);
    });
  });

  it("should throw error if place by type not found", async () => {
    const fakeType = "FakeType";
    const response = await request(app).get(`/api/places/type/${fakeType}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Places not found" });
  });

  it("should return places by days", async () => {
    const days = "Tuesday";
    const response = await request(app).get(`/api/places/days/${days}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return places by multiple days", async () => {
    const days = "Tuesday,Wednesday";
    const response = await request(app).get(`/api/places/days/${days}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should throw error if place by days not found", async () => {
    const fakeDays = "FakeDays";
    const response = await request(app).get(`/api/places/days/${fakeDays}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Places not found" });
  });

  it("should return places by time", async () => {
    const open = "13:00";
    const close = "17:00";
    const response = await request(app).get(
      `/api/places/time/${open}/${close}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return places by name", async () => {
    const name = "St.";
    const response = await request(app).get(`/api/places/search?name=${name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    mongoose.connection.close();
  });
});
