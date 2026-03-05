const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  const result = await pool.query('SELECT * FROM settings');
  console.log(JSON.stringify(result.rows, null, 2));
  process.exit();
}
run();
