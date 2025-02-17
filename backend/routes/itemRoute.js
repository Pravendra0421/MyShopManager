import express from 'express';
import { addItem, deleteItem, getAllitems, updateItem, uploadImage } from '../controllers/item.js';
const router = express.Router();

router.get("/",getAllitems);
router.post("/add",uploadImage,addItem);
router.put("/update/:id",uploadImage,updateItem);
router.delete("/delete/:id",deleteItem);

export default router;