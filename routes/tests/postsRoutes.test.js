import request from "supertest";
import app from "../../app";
import { expect, test } from "@jest/globals";

import { resetTables } from "../../database/helpers.js";
import { pool } from "../../database/index";

beforeEach(async () => {
  await resetTables();
});

afterAll(async () => {
  await resetTables();
  pool.end();
});

describe("Get requests for posts", () => {
  test("Get all posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
    });
  });

  test("Get posts by author", async () => {
    const response = await request(app).get("/posts/author/?author=ben");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: [
        {
          title: "Flex-box or grid for onboarding dashboard",
          topic: "CSS",
          body: "Should I used flex-box or grid when creating the onboarding dashboard app?",
          date_created: expect.any(String),
          author: 3,
          post_id: 2,
          name: "Ben Lloyd",
          password: "password",
          email: "ben@lloyd.com",
          image_url: expect.any(String),
          team: "DevOps",
          user_id: 3,
        },
      ],
    });
  });

  //   test("Get posts by searching using title and type", async () => {
  //     const response = await request(app).get("/posts/author/");
  //     expect(response.status).toEqual(200);
  //     expect(response.body).toStrictEqual({
  //       success: true,
  //       payload:
  //     });
  //   });
});
