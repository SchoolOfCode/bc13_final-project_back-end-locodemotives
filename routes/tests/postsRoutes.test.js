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

describe("Post requests for new post or reply", () => {
  test("Create new post", async () => {
    const response = await request(app).post("/posts/post").send({
      title: "Testing new post",
      topic: "Testing",
      body: "How to create a new post?",
      date_created: "2023-01-09",
      author: 1,
    });
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: {
        post_id: 3,
        title: "Testing new post",
        topic: "Testing",
        body: "How to create a new post?",
        date_created: expect.any(String),
        author: 1,
      },
    });
  });

  test("Create new reply", async () => {
    const response = await request(app).post("/posts/reply").send({
      post: 1,
      author: 3,
      body: "This is how you make a reply",
      date_created: "2023-01-09",
    });
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: {
        reply_id: 4,
        post: 1,
        author: 3,
        body: "This is how you make a reply",
        date_created: expect.any(String),
      },
    });
  });
});

/* Delete tests - not possible due to foriegn key issues
describe("Delete request for post or reply", () => {
  test("Delete a post", async () => {
    const response = await request(app).delete("/posts/deletePost/1");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      title: "PostgreSQL foreign keys",
      topic: "PostgreSQL",
      body: "How to do foreign keys in postgreSQL?",
      date_created: "2023-01-06",
      author: 1,
      post_id: 1,
    });
  });

  test("Delete a reply", async () => {
    const response = await request(app).delete("/posts/deleteReply/1");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      post: 1,
      author: 2,
      body: "Use references table_name(table_item)",
      date_created: "2023-01-07",
      reply_id: 1,
    });
  });
});
*/
