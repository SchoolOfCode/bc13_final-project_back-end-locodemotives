import { pool } from "../database/index.js";

async function getUserByEmail(email) {
  const results = await pool.query(
    `SELECT * FROM users
    WHERE email = $1;`,
    [email]
  );
  const rows = results.rows[0];
  return rows;
}

async function getUserByName(name) {
  const results = await pool.query(
    `SELECT * FROM users
    WHERE LOWER(name) LIKE LOWER ('%'||$1||'%')`,
    [name]
  );
  const rows = results.rows[0];
  return rows;
}

async function getUserById(id) {
  const results = await pool.query(
    `SELECT * FROM users
    WHERE user_id = $1`,
    [id]
  );
  const rows = results.rows[0];
  return rows;
}

async function newUser(body) {
  const results = await pool.query(
    `INSERT INTO users
    (
      email,
      password,
      image_url,
      team,
      name
    ) VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5
    ) RETURNING *`,
    [body.email, body.password, body.image_url, body.team, body.name]
  );
  const rows = results.rows[0];
  return rows;
}

async function deleteUser(user_id) {
  const results = await pool.query(
    `DELETE FROM users
    WHERE user_id = $1
    RETURNING *;`,
    [user_id]
  );
  const rows = results.rows[0];
  return rows;
}

export { getUserByEmail, getUserByName, getUserById, newUser, deleteUser };
