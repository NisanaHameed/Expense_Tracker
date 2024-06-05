import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/user.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: ['https://expense-tracker-coral-eta.vercel.app'],
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true
    })
)

app.use('/',router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 3006;

app.listen(port, () => console.log(`server is running on port ${port}`));