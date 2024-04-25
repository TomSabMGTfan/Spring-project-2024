import express from 'express';
import dotenv from 'dotenv/config';

import AuthMiddleware from '../middleware/authMiddleware.mjs';

import tasksController from '../controllers/tasksController.mjs';
import { createTaskValidationSchema, updateTaskValidationSchema, 
         updateTaskStatusValidationSchema, updateTaskWorkerValidationSchema } from '../validators/taskValidator.mjs';


const router = express.Router();



router.post('/', [AuthMiddleware, createTaskValidationSchema], tasksController.createTask);
router.get("/project/:project_id", tasksController.getTasksByProjectId);
router.get("/user/:user_id", tasksController.getTasksByUserId);
router.put("/", [AuthMiddleware, updateTaskValidationSchema], tasksController.updateTask);
router.put("/status", [AuthMiddleware, updateTaskStatusValidationSchema], tasksController.updateTaskStatus);
router.put("/worker", [AuthMiddleware, updateTaskWorkerValidationSchema], tasksController.updateTaskWorker);
router.delete("/:id", AuthMiddleware, tasksController.deleteTask);




export default router;