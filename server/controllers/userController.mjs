import bcrypt from 'bcrypt';

import userModel from '../models/userModel.mjs'; // Update this path to the path of your User model

const userController = {

	createUser: async (req, res) => {
		try {
			const { username, password, repeatPassword, email, role = 'user'} = req.body;

			const existingUser = await userModel.getUserByEmail(email);
			if (existingUser) {
				res.status(400).json({ message: 'Email already exists.' });
				return;
			}

			if (password !== repeatPassword) {
				res.status(400).json({ message: 'Passwords do not match.' });
				return;
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = {
				username,
				password: hashedPassword,
				email,
				registered_on: new Date(),
				reservations: [],
				role: 'user' // reikia priskirti default role naujam sukurtam useriui
			};

			const createUser = await userModel.createUser(newUser);
			res.status(201).json(createUser); // reikia res status kad per json grazintu useri pagal createUser funkcija

		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'An error occurred while creating the user.' });
		}
	},

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
				res.status(500).json({ message: 'An error occurred while logging in.' });
			}
		}
	}
};

export default userController;