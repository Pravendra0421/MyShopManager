import express from 'express';
import dotenv from 'dotenv';
import http from 'http'
import { Server } from 'socket.io';
import supabase from './database/supabase.js';
import authRoutes from './routes/AuthRoute.js';
import itemRoute from './routes/itemRoute.js';
import salesRoute from './routes/salesRoute.js';
import profileRoute from './routes/profileRoute.js';
import cors from 'cors';
import path from 'path';
dotenv.config();
const app= express();
const PORT = process.env.PORT || 5000;
//create HTTP server for socket.io
const server = http.createServer(app);
export const io=new Server(server,{
    cors:{
        origin:'https://myshopmanager.onrender.com',
        methods: ['GET', 'POST','PUT','DELETE'],
        credentials:true,
    }
});
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
app.use('/profile',profileRoute);
// Add this middleware in your server (Express.js)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
//socket connection
io.on("connection",(socket)=>{
    console.log("NEW client connected",socket.id);

    socket.on("disconnect",()=>{
        console.log("client disconected",socket.id);
    });
});
app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});
