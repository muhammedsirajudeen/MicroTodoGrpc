import { Pool } from "pg";
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // This should match the DATABASE_URL set in Docker Compose
});

export default pool
