import express from 'express';
import dotenv from 'dotenv/config';


import AuthMiddleware from '../middleware/authMiddleware.mjs';

import projectWorkersController from '../controllers/projectWorkersController.mjs';

import { updatePWorkerValidationSchema, deletePWorkerValidationSchema } from '../validators/projectWorkerValidator.mjs';

const router = express.Router();

router.get('/byuser/:user_id', AuthMiddleware, projectWorkersController.getPWorkersByUserId);
router.put("/", [AuthMiddleware, updatePWorkerValidationSchema], projectWorkersController.updatePWorker);
router.delete("/", [AuthMiddleware, deletePWorkerValidationSchema], projectWorkersController.deletePWorker);


export default router;