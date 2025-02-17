import express from 'express'
import authMiddleware from '../middleware/AuthMiddleware'

const router = express.Router();
router.get("/verify",authMiddleware,(req,res)=>{
    
})