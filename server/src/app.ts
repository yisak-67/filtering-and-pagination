import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes';
import dotenv from 'dotenv';
import path from 'path';
import configs from './config/config';

// Load environment variables from a custom path
dotenv.config({
  path: path.join(__dirname, "./env"),
});

const app: Express = express();
const PORT: string | number = configs.portInfo.portNumber || 4000;

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use("/api/v1/products", productRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO as string)
  .then(() => app.listen(PORT, 
    () => console.log(`Server running on http://localhost:${PORT}`)
  ))
  .catch(error => {
    throw error;
  });
