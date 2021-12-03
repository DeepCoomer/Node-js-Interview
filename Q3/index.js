import express from 'express';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import authRoutes from './routes/auth.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT;

Connection(process.env.MONGO_URL);

// Middlewares

app.use(express.json());

// Routes

app.use('/',authRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})