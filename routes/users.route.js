import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();
import {getUserById, updateUser, deleteUser, followUser, unfollowUser, getTimelineSnippets} from '../controllers/User.controller.js';

router.get('/:id', getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.put('/:id/follow', verifyToken, followUser);
router.put('/:id/unfollow', verifyToken, unfollowUser);
router.get('/timeline/:id', verifyToken, getTimelineSnippets);

export default router;