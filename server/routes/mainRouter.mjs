import express from 'express';

import usersRouter from './usersRouter.mjs';
import projectsRouter from './projectsRouter.mjs';
import tasksRouter from './tasksRouter.mjs';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/projects', projectsRouter);
router.use("/tasks", tasksRouter);

export default router;