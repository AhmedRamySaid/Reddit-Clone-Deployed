import bcrypt from 'bcrypt';

/**
 * Hashes a password securely using bcrypt
 *
 * @param password - The raw password to hash
 * @param saltRounds - Number of salt rounds (default: 10)
 * @returns The hashed password as a string
 */
export async function hashPassword(password: string, saltRounds: number = 10): Promise<string> {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
}