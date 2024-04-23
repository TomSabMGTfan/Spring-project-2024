import express from 'express';

import usersRouter from './usersRouter.mjs';

import projectsRouter from './projectsRouter.mjs'

const router = express.Router();

router.use('/users', usersRouter);
router.use('/projects', projectsRouter);

export default router;