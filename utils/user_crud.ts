import pkg from 'pg';
import {hashPassword} from "./hash";
const { Pool } = pkg;

// Configure your database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'reddit_database',
    password: '12345678',
    port: 5432,
});

/* Example usage
(async () => {
    await createUser('alice@example.com', 'alice123', 'securePassword');
    await pool.end(); // Close the connection pool when done
})();
*/

/**
 * Creates a new user in the database.
 *
 * @param email - The user's email address.
 * @param username - The user's chosen username which cannot be changed.
 * @param password - The user's password not hashed. The password is hashed within the function itself.
 * @returns A promise that resolves when the user is created.
 */
async function CreateUser(email: string, username: string, password: string): Promise<void> {
    try {
        const hashedPassword : string = await hashPassword(password);
        await pool.query('SELECT create_user($1, $2, $3)', [email, username, hashedPassword]);
        console.log('User created successfully');
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
}

/**
 * Sets the profile picture for a user given their email address.
 *
 * @param email - The user's email address.
 * @param profile_pic_link - The link to the user's new profile picture.
 * @returns A promise that resolves when the user's profile picture is changed.
 */
async function SetPfp(email: string, profile_pic_link : string): Promise<void> {
    try {
        await pool.query('SELECT set_profile_picture($1, $2)', [email, profile_pic_link]);
    } catch (err) {
        console.error('Error setting profile picture:', err);
        throw err;
    }
}

/**
 * Sets the about me for a user given their email address.
 *
 * @param email - The user's email address.
 * @param about_me - The user's new about me.
 * @returns A promise that resolves when the user's about me is set.
 */
async function SetAboutMe(email: string, about_me : string): Promise<void> {
    try {
        await pool.query('SELECT set_about_me($1, $2)', [email, about_me]);
    } catch (err) {
        console.error('Error setting about me:', err);
        throw err;
    }
}

/**
 * Changes the user's password given their email address.
 * the password is given un-hashed and is hashed within the function itself.
 *
 * @param email - The user's email address.
 * @param password - The user's new password un-hashed.
 * @returns A promise that resolves when the user's password is changed.
 */
async function SetPassword(email: string, password : string): Promise<void> {
    try {
        const hashed_password : string = await hashPassword(password);
        await pool.query('SELECT set_password($1, $2)', [email, hashed_password]);
    } catch (err) {
        console.error('Error changing password:', err);
        throw err;
    }
}

/**
 * Deletes the user from the database.
 * All related data is also deleted via cascading.
 *
 * @param email - The user's email address.
 * @returns A promise that resolves when the user is deleted.
 */
async function DeleteUser(email: string): Promise<void> {
    try {
        await pool.query('SELECT delete_user($1)', [email]);
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
}

export default pool;