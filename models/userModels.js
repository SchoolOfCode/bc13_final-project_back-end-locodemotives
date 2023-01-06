import { pool } from "../database/index.js";

async function getUser(email) {
  const results = await pool.query(
    `SELECT * FROM users
    WHERE email = $1;`,
    [email]
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

export { getUser, deleteUser };
