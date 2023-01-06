import { pool } from "../database/index.js";

// Get posts by author
async function getPostsByAuthor(name) {
  const results = await pool.query(
    `SELECT * FROM users
    INNER JOIN posts
    ON users.user_id = posts.author
    WHERE LOWER (users.name) LIKE LOWER ('%'||$1||'%')`,
    [name]
  );
  const rows = results.rows;
  return rows;
}

// Get posts by searching using title and type
async function getPostsBySearch(title, topic) {
  if (title != null && topic == null) {
    const results = await pool.query(
      `SELECT * FROM posts
        WHERE LOWER(title) LIKE LOWER('%'||$1||'%')`,
      [title]
    );
    const rows = results.rows;
    return rows;
  } else if ((title = null && topic != null)) {
    const results = await pool.query(
      `SELECT * FROM posts
        WHERE topic = $1;`,
      [topic]
    );
    const rows = results.rows;
    return rows;
  } else if (title != null && topic != null) {
    const results = await pool.query(
      `SELECT * FROM posts
            WHERE LOWER(title) LIKE LOWER('%'||$1||'%') AND topic = $2;`,
      [title, topic]
    );
    const rows = results.rows;
    return rows;
  }
}

// Get replies for a post
async function getRepliesByPost(post) {
  const results = await pool.query(
    `SELECT * FROM replies
    WHERE post = $1`,
    [post]
  );
  const rows = results.rows;
  return rows;
}

// Create a new post
// Create a new reply
// Delete post by post_id
// Delete replies by reply_id

export { getPostsByAuthor, getPostsBySearch, getRepliesByPost };
