import express from 'express';

import usersRouter from './usersRouter.mjs';
import projectsRouter from './projectsRouter.mjs';
import tasksRouter from './tasksRouter.mjs';
import projectWorkersRouter from './projectWorkersRouter.mjs';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/projects', projectsRouter);
router.use("/tasks", tasksRouter);
router.use("/pworkers", projectWorkersRouter);

export default router;