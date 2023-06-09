import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';


const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage + " " + err);
})

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Database connected")
    }catch(err){
        console.log(err);
    }
}

app.listen(8800, () => {
    connect()
    console.log("Server is running on port 8800")
})
