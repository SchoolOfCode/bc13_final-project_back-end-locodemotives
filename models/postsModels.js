import { pool } from "../database/index.js";

// Get all posts
async function getAllPosts() {
  const results = await pool.query(
    `SELECT * FROM posts ORDER BY date_created DESC;`
  );
  const rows = results.rows;
  return rows;
}

// Get posts by author
async function getPostsByAuthor(name) {
  const results = await pool.query(
    `SELECT * FROM users
    INNER JOIN posts
    ON users.user_id = posts.author
    WHERE LOWER (users.name) LIKE LOWER ('%'||$1||'%')
    ORDER BY posts.date_created DESC;`,
    [name]
  );
  const rows = results.rows;
  return rows;
}

// Get posts by ID
async function getPostsByID(id) {
  const results = await pool.query(
    `SELECT * FROM posts
    WHERE post_id = $1
    ORDER BY posts.date_created DESC;`,
    [id]
  );
  const rows = results.rows;
  return rows;
}

// Get posts by searching using title and topic
async function getPostsBySearch(title, topic) {
  if (title != "null" && topic == "null") {
    const results = await pool.query(
      `SELECT * FROM posts
        WHERE LOWER(title) LIKE LOWER('%'||$1||'%')
        ORDER BY date_created DESC;`,
      [title]
    );
    const rows = results.rows;
    return rows;
  } else if (title == "null" && topic != "null") {
    const results = await pool.query(
      `SELECT * FROM posts
        WHERE topic = $1
        ORDER BY date_created DESC;`,
      [topic]
    );
    const rows = results.rows;
    return rows;
  } else if (title != "null" && topic != "null") {
    const results = await pool.query(
      `SELECT * FROM posts
            WHERE LOWER(title) LIKE LOWER('%'||$1||'%') 
              AND topic = $2
            ORDER BY date_created DESC;`,
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
    WHERE post = $1 
    ORDER BY date_created DESC;`,
    [post]
  );
  const rows = results.rows;
  return rows;
}

// Get replies for a user
async function getRepliesByUser(user) {
  const results = await pool.query(
    `SELECT * FROM replies
    WHERE author = $1 
    ORDER BY date_created DESC;`,
    [user]
  );
  const rows = results.rows;
  return rows;
}

// Create a new post
async function createNewPost(body) {
  const results = await pool.query(
    `INSERT INTO posts (title, topic, body, date_created, author)
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;`,
    [body.title, body.topic, body.body, body.date_created, body.author]
  );
  const rows = results.rows[0];
  return rows;
}

// Create a new reply
async function createNewReply(body) {
  const results = await pool.query(
    `INSERT INTO replies (post, body, date_created, author)
    VALUES ($1, $2, $3, $4) 
    RETURNING *;`,
    [body.post, body.body, body.date_created, body.author]
  );
  const rows = results.rows[0];
  return rows;
}

// Delete post by post_id
async function deletePost(id) {
  const results = await pool.query(
    `DELETE FROM posts
    WHERE post_id = $1 
    RETURNING *;`,
    [id]
  );
  const rows = results.rows[0];
  return rows;
}

// Delete replies by reply_id
async function deleteReply(id) {
  const results = await pool.query(
    `DELETE FROM replies
    WHERE reply_id = $1 
    RETURNING *;`,
    [id]
  );
  const rows = results.rows[0];
  return rows;
}

export {
  getAllPosts,
  getPostsByAuthor,
  getPostsBySearch,
  getPostsByID,
  getRepliesByPost,
  getRepliesByUser,
  createNewPost,
  createNewReply,
  deletePost,
  deleteReply,
};
