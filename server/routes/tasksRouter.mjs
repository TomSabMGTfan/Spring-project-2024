import express from 'express';
import dotenv from 'dotenv/config';

import AuthMiddleware from '../middleware/authMiddleware.mjs';

import tasksController from '../controllers/tasksController.mjs';



const router = express.Router();



router.post('/', [AuthMiddleware(), null], tasksController.createTask);




export default router;