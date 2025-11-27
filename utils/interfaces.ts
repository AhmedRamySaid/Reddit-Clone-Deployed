import pkg from "pg";
const { Pool } = pkg;

// Configure your database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345678',
    port: 5432,
});

// User data
export interface User {
    email: string;
    username: string;
    profile_picture_link?: string | null;
    about_me?: string | null;
    created_on: Date;
}

export default pool