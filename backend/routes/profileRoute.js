import express from "express";
import { getProfile, updateProfile, uploadMiddleware } from "../controllers/profile.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/update', authMiddleware, uploadMiddleware, updateProfile);
router.get('/getprofile',authMiddleware,getProfile);

export default router;
