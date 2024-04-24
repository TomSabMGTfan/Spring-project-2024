import express from 'express';
import dotenv from 'dotenv';

import projectsController from '../controllers/projectsController.mjs';
import AuthMiddleware from '../middleware/authMiddleware.mjs';

dotenv.config();

const router = express.Router();

router.post('/', AuthMiddleware.authenticateUser, async(req, res) => {
    try {
        const {name, description} = req.body;
        const createdProject = await projectsController.createProject(name, description);
        res.status(201).json(createdProject)
    } catch (error) {
        console.error(err);
        res.status(500).json({message: 'an error has occurred while created a project listing'})
    }
});


export default router;