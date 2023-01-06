import { createTables } from "../helpers";
import { pool } from "../index";

try {
  await createTables();
  console.log("Created tables");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}
