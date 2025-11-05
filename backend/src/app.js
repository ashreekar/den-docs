import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/User.route.js"
import postRoute from './routes/Post.route.js'

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));
app.use(express.static("public"));
app.use(express.json({
    limit: "16kb"
}));
app.use(cookieParser());

// routes

app.use('/api/v1/user', userRoute);
app.use('/api/v1/post',postRoute);


export { app };