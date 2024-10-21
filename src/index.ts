import { AppDataSource } from "./data-source"
import * as express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { userRouter } from "./routes/user.router";

const app = express();


app.use("/auth", userRouter);

AppDataSource.initialize().then(async () => {


}).catch(error => console.log(error))
