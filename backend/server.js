import express from 'express';
import dotenv from 'dotenv';
import supabase from './database/supabase.js';
import authRoutes from './routes/AuthRoute.js';
import itemRoute from './routes/itemRoute.js';
import salesRoute from './routes/salesRoute.js';
import cors from 'cors';
import path from 'path';
dotenv.config();
const app= express();
const PORT = process.env.PORT || 5000;
const _dirname=path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'https://myshopmanager.onrender.com', // Allow frontend origin
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
app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});
