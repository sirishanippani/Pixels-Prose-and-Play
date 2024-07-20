import express from 'express';
import { createUser, loginUser, googleAuth } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signUp', createUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);

export default router