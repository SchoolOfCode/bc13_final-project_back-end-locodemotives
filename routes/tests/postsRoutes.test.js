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

  test("Get posts by searching using title and topic", async () => {
    const response = await request(app).get(
      "/posts/search/?title=PostgreSQL&topic=PostgreSQL"
    );
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: [
        {
          title: "PostgreSQL foreign keys",
          topic: "PostgreSQL",
          body: "How to do foreign keys in postgreSQL?",
          date_created: expect.any(String),
          author: 1,
          post_id: 1,
        },
      ],
    });
  });

  test("Get posts by searching using title", async () => {
    const response = await request(app).get(
      "/posts/search/?title=PostgreSQL&topic=null"
    );
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: [
        {
          title: "PostgreSQL foreign keys",
          topic: "PostgreSQL",
          body: "How to do foreign keys in postgreSQL?",
          date_created: expect.any(String),
          author: 1,
          post_id: 1,
        },
      ],
    });
  });

  test("Get posts by searching using topic", async () => {
    const response = await request(app).get(
      "/posts/search/?title=null&topic=PostgreSQL"
    );
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: [
        {
          title: "PostgreSQL foreign keys",
          topic: "PostgreSQL",
          body: "How to do foreign keys in postgreSQL?",
          date_created: expect.any(String),
          author: 1,
          post_id: 1,
        },
      ],
    });
  });
});

describe("Get replies for posts", () => {
  test("Get all replies for a post", async () => {
    const response = await request(app).get("/posts/replies/?post=1");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: [
        {
          reply_id: 1,
          post: 1,
          author: 2,
          body: "Use references table_name(table_item)",
          date_created: expect.any(String),
        },
      ],
    });
  });
});
