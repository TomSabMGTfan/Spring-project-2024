import express from 'express';
import dotenv from 'dotenv';


import AuthMiddleware from '../middleware/authMiddleware.mjs';

import projectsController from '../controllers/projectsController.mjs';

dotenv.config();

const router = express.Router();



router.post('/', AuthMiddleware(), projectsController.createProject);




export default router;