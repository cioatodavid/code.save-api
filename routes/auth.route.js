
import express from 'express';
const router = express.Router();

import { register, login, logout } from '../controllers/Auth.controller.js';

// register
router.post('/register', register)

// login
router.post('/login', login)

// logout
router.get('/logout', logout)


export default router;