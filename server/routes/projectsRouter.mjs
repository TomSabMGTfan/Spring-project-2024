import express from 'express';
import dotenv from 'dotenv';


import AuthMiddleware from '../middleware/authMiddleware.mjs';

import projectsController from '../controllers/projectsController.mjs';

import {createProjectValidationSchema, updateProjectValidationSchema} from '../validators/projectValidator.mjs';

dotenv.config();

const router = express.Router();



router.post('/', [AuthMiddleware, createProjectValidationSchema], projectsController.createProject);
router.delete('/:id', AuthMiddleware,  projectsController.deleteProject); 
router.get('/:id', AuthMiddleware, projectsController.getProjectById); 
router.put('/', [AuthMiddleware, updateProjectValidationSchema], projectsController.updateProject); // 
router.get('/projects', AuthMiddleware, projectsController.getMyProjects); // did not test 








export default router;