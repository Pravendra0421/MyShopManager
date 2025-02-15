import express from 'express';
import dotenv from 'dotenv';
import supabase from './database/supabase.js';
import authRoutes from './routes/AuthRoute.js';
import cors from 'cors'
dotenv.config();
const app= express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173', // Allow frontend origin
    methods: ['GET', 'POST'], // Corrected key (methods, not method)
    allowedHeaders: ['Content-Type'], // Fixed content-type as a string
    credentials: true, // Allows cookies and authentication headers
};
app.use(cors(corsOptions));
app.use('/auth',authRoutes);
app.get('/',async (req,res)=>{
    res.send('hello world');
})
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});
