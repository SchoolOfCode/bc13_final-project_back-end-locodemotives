import { pool } from "../database/index.js";

//Get all resources
async function getAllResources() {
  const results = await pool.query(`SELECT * FROM resources;`);
  const rows = results.rows;
  return rows;
}

// Get resources by searching using topic and type
async function getResources(topic, type) {
  if (type != "null" && topic == "null") {
    const results = await pool.query(
      `SELECT * FROM resources
        WHERE type = $1`,
      [type]
    );
    const rows = results.rows;
    return rows;
  } else if (type == "null" && topic != "null") {
    const results = await pool.query(
      `SELECT * FROM resources
        WHERE topic = $1;`,
      [topic]
    );
    const rows = results.rows;
    return rows;
  } else if (type != "null" && topic != "null") {
    const results = await pool.query(
      `SELECT * FROM resources
            WHERE type = $1 AND topic = $2;`,
      [type, topic]
    );
    const rows = results.rows;
    return rows;
  }
}

async function createNewResource(body) {
  const results = await pool.query(
    `INSERT INTO rsources (title, description, link, topic, type, author, date_created)
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *;`,
    [body.post, body.body, body.date_created, body.author]
  );
  const rows = results.rows[0];
  return rows;
}

async function deleteResource(id) {
  const results = await pool.query(
    `DELETE FROM resources
    WHERE resource_is = $1
    RETURNING *;`,
    [id]
  );
  const rows = results.rows[0];
  return rows;
}

export { getAllResources, getResources, createNewResource, deleteResource };
