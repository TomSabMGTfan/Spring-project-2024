import bcrypt from 'bcrypt';
import { pool } from '../db/postgresConnection.mjs';

const userModel = {

	createUser: async (newUser) => {
		try {
			const { username, password, email, registered_on, role = 'user' } = newUser;

			const result = await pool.query('INSERT INTO users (username, password, email, registered_on, role) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, password, email, registered_on, role]);
			return result.rows[0];
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	getUserByEmail: async ({email}) => {
		try {
			const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
			return result.rows[0];
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	login: async ({ username, email }) => {
		const userResult = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);

		if (userResult.rows.length === 0) {
			throw new Error('User not found.');
		}

		const user = userResult.rows[0];

		return user;
	},

	getUserById: async (id) => {
		const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
		return result.rows[0];
	},

};

export default userModel;