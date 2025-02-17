import express from 'express';
import { addItem, deleteItem, getAllitems, updateItem } from '../controllers/item.js';
const router = express.Router();

router.get("/",getAllitems);
router.post("/add",addItem);
router.put("/update/:id",updateItem);
router.delete("/delete/:id",deleteItem);

export default router;