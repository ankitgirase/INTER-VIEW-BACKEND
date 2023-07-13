import express from "express";
import cors from "cors";
import "dotenv/config";
// import dotenv from 'dotenv';
import mongoose from "mongoose";
import {userRouter} from "./routes/users.js";
import {interviewRouter} from "./routes/interviews.js";

const app = express();

app.use(express.json()); // when this code is executed, it instructs the Express application to use the JSON middleware. It enables the application to parse incoming JSON data and work with it easily
app.use(cors()); // When this code is executed, it tells the Express application to use the CORS middleware.

app.use("/auth", userRouter);
app.use("/interviews", interviewRouter);

mongoose.connect(process.env.MONGO_URI);

app.listen(3001, () => console.log("server started!!!"));
