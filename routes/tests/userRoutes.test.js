import request from "supertest";
import app from "../../app";
import { expect, test } from "@jest/globals";

import { resetTables } from "../../database/helpers.js";
import { pool } from "../../database/index";

beforeEach(async () => {
  await resetTables();
});

afterAll(() => {
  pool.end();
});

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
