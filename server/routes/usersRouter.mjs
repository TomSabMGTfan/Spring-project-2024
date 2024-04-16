// Importing express module
import express from 'express';
import dotenv from 'dotenv';

import userController from '../controllers/userController.mjs';

import { registerUserValidationSchema, loginValidationSchema } from '../validators/userValidator.mjs';

import AuthMiddleware from '../middleware/authMiddleware.mjs';

dotenv.config();

const router = express.Router();

router.post('/register', registerUserValidationSchema, userController.createUser);

router.post('/login', loginValidationSchema, userController.login);

router.get("/", AuthMiddleware("Admin"), userController.getUserById);

export default router;