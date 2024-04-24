import express from 'express';
import dotenv from 'dotenv/config';

import AuthMiddleware from '../middleware/authMiddleware.mjs';

import tasksController from '../controllers/tasksController.mjs';



const router = express.Router();



router.post('/', [AuthMiddleware, null], tasksController.createTask);
router.get("/:project_id", tasksController.getTasksByProjectId);
router.put("/", [AuthMiddleware, null], tasksController.updateTask);
router.delete("/:id", AuthMiddleware, tasksController.deleteTask);




export default router;