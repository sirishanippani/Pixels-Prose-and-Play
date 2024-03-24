import express from 'express';
import { createUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signUp', createUser);

export default router