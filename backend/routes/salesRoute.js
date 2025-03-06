import { getLast7DaySales, getTodaySales, getTotalRevenue, sellItem } from "../controllers/sales.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import express from 'express';
const router =express.Router();

router.post('/sell', authMiddleware,sellItem);
router.get('/revenue', authMiddleware,getTotalRevenue);
router.get('/today', authMiddleware,getTodaySales);
router.get('/last7days', authMiddleware,getLast7DaySales);
export default router;