import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

import userModel from '../models/userModel.mjs';

const localStrategy = new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password',
}, async (login, password, done) => { // turejo but login, nes be login neveiks funkcija, nes login yra nurodytas kaip metodas arba vieta kur vesiu duomenis
	try {
		const user = await userModel.login({ username: login, email: login });
		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			return done(null, false, { message: 'Invalid credentials.' });
		}

		return done(null, user);

	} catch (error) {
		{
			if (error.message === 'User not found.') {
				return done(null, false, { message: error.message });
			}
			return done(error);
		}
	}
});

export default localStrategy;