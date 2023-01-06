import { dropTables } from "../helpers.js";
import { pool } from "../index.js";

try {
  await dropTables();
  console.log("Dropped tables");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}
