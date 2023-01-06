import { refillTables } from "../helpers.js";
import { pool } from "../index.js";

try {
  await refillTables();
  console.log("Seeded tables");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}
