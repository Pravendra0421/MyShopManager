import { getLast7DaySales, getTotalRevenue, sellItem } from "../controllers/sales.js";
import express from 'express';
const router =express.Router();

router.post('/sell',sellItem);
router.get('/revenue',getTotalRevenue);
router.get('/last7days',getLast7DaySales);
export default router;