import express from 'express';
import { addItem, deleteItem, getAllitems, getItemById, updateItem, uploadImage } from '../controllers/item.js';
import authMiddleware from '../middleware/AuthMiddleware.js';
const router = express.Router();

router.get("/",authMiddleware,getAllitems);
router.post("/add",authMiddleware,uploadImage,addItem);
router.put("/update/:id",authMiddleware,uploadImage,updateItem);
router.delete("/delete/:id",authMiddleware,deleteItem);
router.get("/:id",authMiddleware,getItemById);

export default router;