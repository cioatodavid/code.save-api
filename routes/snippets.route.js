import express from 'express';
const router = express.Router();

import { verifyToken } from '../utils/verifyToken.js';

import { createSnippet, updateSnippet, deleteSnippet, getSnippet,  getUserSnippets } from '../controllers/Snippet.controller.js';

router.post('/', verifyToken, createSnippet);
router.put('/:id', verifyToken, updateSnippet);
router.delete('/:id', verifyToken, deleteSnippet);
router.get('/:id', getSnippet);
router.get('/profile/:id', getUserSnippets);


export default router;