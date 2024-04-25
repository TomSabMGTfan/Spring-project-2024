import express from 'express';
import dotenv from 'dotenv/config';

import AuthMiddleware from '../middleware/authMiddleware.mjs';

import tasksController from '../controllers/tasksController.mjs';
import { createTaskValidationSchema, updateTaskValidationSchema } from '../validators/taskValidator.mjs';


const router = express.Router();



router.post('/', [AuthMiddleware, createTaskValidationSchema], tasksController.createTask);
router.get("/:project_id", tasksController.getTasksByProjectId);
router.put("/", [AuthMiddleware, updateTaskValidationSchema], tasksController.updateTask);
router.delete("/:id", AuthMiddleware, tasksController.deleteTask);




export default router;