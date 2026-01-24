import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Serverless-safe settings for Neon PostgreSQL
    max: 5, // Limit connections for serverless
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    connectionTimeoutMillis: 10000, // Fail fast if connection takes too long
    ssl: {
        rejectUnauthorized: false // Required for Neon and other hosted PG instances
    }
});

pool.on('connect', () => {
    console.log('Connected to Neon PostgreSQL');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;
