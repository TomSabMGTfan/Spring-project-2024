import express from 'express';
import dotenv from 'dotenv/config';

import AuthMiddleware from '../middleware/authMiddleware.mjs';

import tasksController from '../controllers/tasksController.mjs';
import { createTaskValidationSchema, updateTaskValidationSchema } from '../validators/taskValidator.mjs';


const router = express.Router();



router.post('/', [AuthMiddleware, createTaskValidationSchema], tasksController.createTask);
router.get("/project/:project_id", tasksController.getTasksByProjectId);
router.get("/user/:user_id", tasksController.getTasksByUserId);
router.put("/", [AuthMiddleware, updateTaskValidationSchema], tasksController.updateTask);
router.put("/user", [AuthMiddleware, updateTaskValidationSchema], tasksController.updateTaskStatus);
router.delete("/:id", AuthMiddleware, tasksController.deleteTask);




export default router;