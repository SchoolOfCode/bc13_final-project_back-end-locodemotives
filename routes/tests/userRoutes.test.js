import request from "supertest";
import app, { server } from "../../app";
import { expect, test } from "@jest/globals";

import { resetTables } from "../../database/helpers.js";
import { pool } from "../../database/index";

beforeEach(async () => {
  await resetTables();
});

afterAll(async () => {
  await resetTables();
  pool.end();
  server.close();
});

describe("Get requests for users", () => {
  test("Get user by id", async () => {
    const response = await request(app).get("/user/?id=1");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: {
        user_id: 1,
        email: "roman@hadjisergis.com",
        password: "password",
        image_url: expect.any(String),
        team: "Support Services",
        name: "Roman Hadjisergis",
      },
    });
  });

  test("Get user by email", async () => {
    const response = await request(app).get("/user/?email=elspeth@brown.com");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: {
        user_id: 2,
        email: "elspeth@brown.com",
        password: "password",
        image_url: expect.any(String),
        team: "Digital Development",
        name: "Elspeth Brown",
      },
    });
  });

  test("Get user by name", async () => {
    const response = await request(app).get("/user/?name=Ben Lloyd");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: {
        user_id: 3,
        email: "ben@lloyd.com",
        password: "password",
        image_url: expect.any(String),
        team: "DevOps",
        name: "Ben Lloyd",
      },
    });
  });
});

describe("Post request for users", () => {
  test("Create new user", async () => {
    const response = await request(app).post("/user/").send({
      email: "test@test.com",
      password: "password",
      image_url: "url.png",
      team: "Testing",
      name: "Test",
    });
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: {
        email: "test@test.com",
        password: "password",
        image_url: "url.png",
        team: "Testing",
        name: "Test",
        user_id: 5,
      },
    });
  });
});
