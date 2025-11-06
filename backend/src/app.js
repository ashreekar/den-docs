import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/User.route.js"
import postRoute from './routes/Post.route.js'
import path from 'path'

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));
app.use(express.urlencoded());
app.use(express.static(path.resolve("public")));
app.use(express.json());
app.use(cookieParser());

// routes

app.use('/api/v1/user', userRoute);
app.use('/api/v1/post',postRoute);


export { app };