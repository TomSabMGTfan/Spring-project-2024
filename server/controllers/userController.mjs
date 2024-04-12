import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import userModel from '../models/userModel.mjs';

const userController = {

	// POST: User registration
	createUser: async (req, res) => {
		try {
			// Checking for validation errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { username, password, email} = req.body;

			// Hashing password
			const hashedPassword = await bcrypt.hash(password, 10);

			// Creating new user object for user model
			const newUser = {
				username,
				password: hashedPassword,
				email,
				role: "user",
				registered_on: new Date()
			};

			// Creating user
			const createUser = await userModel.createUser(newUser);

			res.status(201).json(createUser);

		} catch (err) {

			// Logging
			console.error(err);

			res.status(500).json({ message: 'An error occurred while creating the user.' });
		}
	},

	// POST: User login
	login: async (req, res) => {
		try {
			const { username, email } = req.body;

			const user = await userModel.login({ username, email });
			console.log(user);
			res.status(200).json({ message: 'Logged in successfully.', user });	
		} catch (err) {
			if (err.message === 'User not found.' || err.message === 'Invalid credentials.') {
				res.status(401).json({ message: err.message });
			} else {
				console.log(err);
				res.status(500).json({ message: 'An error occurred while logging in.' });
			}
		}
	}
};

export default userController;