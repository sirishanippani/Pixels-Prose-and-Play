import express from 'express';
import { createUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signUp', createUser);
router.post('/login', loginUser);

export default router