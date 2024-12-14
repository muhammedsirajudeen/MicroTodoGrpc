"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL, // This should match the DATABASE_URL set in Docker Compose
});
exports.default = pool;
