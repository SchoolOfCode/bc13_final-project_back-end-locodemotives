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

describe("Get requests for resources", () => {
  test("Get all resources", async () => {
    const response = await request(app).get("/resources/");
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: [
        {
          resource_id: 1,
          title: "DevOps Handbook",
          description:
            "How to Create World-Class Agility, Reliability, and Security in Technology Organizations",
          link: "https://www.amazon.co.uk/Devops-Handbook-World-Class-Reliability-Organizations/dp/1942788002",
          topic: "DevOps",
          type: "Book",
          author: 1,
          date_created: expect.any(String),
        },
        {
          resource_id: 2,
          title: "FreeCodeCamp - (New) Responsive Web Design",
          description:
            "In this Responsive Web Design Certification, you'll learn the languages that developers use to build webpages: HTML (Hypertext Markup Language) for content, and CSS (Cascading Style Sheets) for design.",
          link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
          topic: "Digital Development",
          type: "Course",
          author: 3,
          date_created: expect.any(String),
        },
      ],
    });
  });

  test("Get resources by topic and type", async () => {
    const response = await request(app).get(
      "/resources/search/?topic=DevOps&type=Book"
    );
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: [
        {
          resource_id: 1,
          title: "DevOps Handbook",
          description:
            "How to Create World-Class Agility, Reliability, and Security in Technology Organizations",
          link: "https://www.amazon.co.uk/Devops-Handbook-World-Class-Reliability-Organizations/dp/1942788002",
          topic: "DevOps",
          type: "Book",
          author: 1,
          date_created: expect.any(String),
        },
      ],
    });
  });

  test("Get resources by topic", async () => {
    const response = await request(app).get(
      "/resources/search/?topic=DevOps&type=null"
    );
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: [
        {
          resource_id: 1,
          title: "DevOps Handbook",
          description:
            "How to Create World-Class Agility, Reliability, and Security in Technology Organizations",
          link: "https://www.amazon.co.uk/Devops-Handbook-World-Class-Reliability-Organizations/dp/1942788002",
          topic: "DevOps",
          type: "Book",
          author: 1,
          date_created: expect.any(String),
        },
      ],
    });
  });

  test("Get resources by type", async () => {
    const response = await request(app).get(
      "/resources/search/?topic=null&type=Book"
    );
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: [
        {
          resource_id: 1,
          title: "DevOps Handbook",
          description:
            "How to Create World-Class Agility, Reliability, and Security in Technology Organizations",
          link: "https://www.amazon.co.uk/Devops-Handbook-World-Class-Reliability-Organizations/dp/1942788002",
          topic: "DevOps",
          type: "Book",
          author: 1,
          date_created: expect.any(String),
        },
      ],
    });
  });
});

describe("Post requests for resources", () => {
  test("post a new resource", async () => {
    const response = await request(app).post("/resources").send({
      title: "Testing new resource",
      description: "This is testing for a new resource",
      link: "www.thisisatest.com",
      topic: "Testing",
      type: "Website",
      author: 1,
      date_created: "2012-12-21",
    });
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: {
        resource_id: 3,
        title: "Testing new resource",
        description: "This is testing for a new resource",
        link: "www.thisisatest.com",
        topic: "Testing",
        type: "Website",
        author: 1,
        date_created: expect.any(String),
      },
    });
  });
});
