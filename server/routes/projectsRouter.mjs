import express from 'express';
import dotenv from 'dotenv';


import AuthMiddleware from '../middleware/authMiddleware.mjs';

import projectsController from '../controllers/projectsController.mjs';

import {createProjectValidationSchema} from '../validators/projectValidator.mjs';

dotenv.config();

const router = express.Router();



router.post('/', [AuthMiddleware(), createProjectValidationSchema], projectsController.createProject);




export default router;