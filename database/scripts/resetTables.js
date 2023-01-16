import { pool } from "../index.js";
import { resetTables } from "../helpers.js";

try {
  await resetTables();
  console.log("Dropped, re-created and re-seeded tables");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}
