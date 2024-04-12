// Import the JWT Strategy and ExtractJwt method from 'passport-jwt'.
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// Import the dotenv module to load environment variables.
import dotenv from 'dotenv';

// Import the user model.
import userModel from '../models/userModel.mjs';

// Load environment variables from a .env file into process.env.
dotenv.config();

// Define the options for the JWT strategy.
const opts = {
	// Function that accepts a request as the only parameter and returns either the JWT as a string or null.
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	// Secret string which the JWT was signed with.
	secretOrKey: process.env.JWT_SECRET
};

const createJwtStrategy = async () => {
	const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const user = await userModel.getUserById(jwt_payload.id); 
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		} catch (error) {
			return done(error, false);
		}
	});

	return jwtStrategy;
};

export default createJwtStrategy;