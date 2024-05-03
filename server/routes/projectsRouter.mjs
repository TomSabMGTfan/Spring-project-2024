import express from 'express';
import dotenv from 'dotenv';


import AuthMiddleware from '../middleware/authMiddleware.mjs';

import projectsController from '../controllers/projectsController.mjs';

import {createProjectValidationSchema, updateProjectValidationSchema} from '../validators/projectValidator.mjs';

dotenv.config();

const router = express.Router();



router.post('/', [AuthMiddleware, createProjectValidationSchema], projectsController.createProject);
router.delete('/:id', AuthMiddleware,  projectsController.deleteProject); // need validation schema for 2024-05-02
router.get('/:id', AuthMiddleware, projectsController.getProjectById); // need validation schema 2024-05-02
router.put('/', [AuthMiddleware, updateProjectValidationSchema], projectsController.updateProject); // need validation schema test 








export default router;