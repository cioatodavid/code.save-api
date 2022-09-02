import express from 'express';
const router = express.Router();

import { verifyToken } from '../utils/verifyToken.js';

import { createSnippet, updateSnippet, deleteSnippet, getSnippet, likeSnippet, unlikeSnippet, postComment, deleteComment } from '../controllers/Snippet.controller.js';

router.post('/', verifyToken, createSnippet);
router.put('/:id', verifyToken, updateSnippet);
router.delete('/:id', verifyToken, deleteSnippet);
router.get('/:id', getSnippet);
router.put('/:id/like', verifyToken, likeSnippet);
router.put('/:id/unlike', verifyToken, unlikeSnippet);
router.post('/:id/comment', verifyToken, postComment);
router.delete('/:id/comment/:commentId', verifyToken, deleteComment);

export default router;