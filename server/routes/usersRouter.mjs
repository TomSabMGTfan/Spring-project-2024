// Importing express module
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import userController from '../controllers/userController.mjs';

import { registerUserValidationSchema, loginValidationSchema } from '../validators/userValidator.mjs';

import { validate } from '../middleware/schemaValidator.mjs';
import passport from '../strategies/auth.mjs';
import { isUser } from '../middleware/roleCheck.mjs';

dotenv.config();

const router = express.Router();

router.post('/register', registerUserValidationSchema, userController.createUser);

router.post('/login', validate(loginValidationSchema) , passport.authenticate('local', { session: false }), isUser , (req, res) => {
	const token = jwt.sign({ id: req.user.id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
	res.status(200).json({ message: 'Logged in successfully.', token });
} , userController.login);

export default router;