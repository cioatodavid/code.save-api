import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

import { createCollection, getCollection, updateCollection, deleteCollection, getUserCollections, getCollectionSnippets } from "../controllers/Collection.controller.js";


router.post("/", verifyToken, createCollection);
router.get("/:id", verifyToken, getCollection);
router.put("/:id", verifyToken, updateCollection);
router.delete("/:id", verifyToken, deleteCollection);
router.get("/user/:id", verifyToken, getUserCollections);
router.get("/snippets/:id", getCollectionSnippets);

export default router;