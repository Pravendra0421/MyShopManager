import express from 'express';
import dotenv from 'dotenv';
import supabase from './database/supabase.js';
import authRoutes from './routes/AuthRoute.js';
import itemRoute from './routes/itemRoute.js';
import salesRoute from './routes/salesRoute.js';
import cors from 'cors'
dotenv.config();
const app= express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:5173', // Allow frontend origin
    methods: ['GET', 'POST','PUT','DELETE'], // Corrected key (methods, not method)
    allowedHeaders: ['Content-Type','Authorization'], // Fixed content-type as a string
    credentials: true, // Allows cookies and authentication headers
};
app.use(cors(corsOptions));
app.use('/auth',authRoutes);
app.use('/item',itemRoute);
app.use('/sales',salesRoute);
// Add this middleware in your server (Express.js)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
app.get('/',async (req,res)=>{
    res.send('hello world');
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});
