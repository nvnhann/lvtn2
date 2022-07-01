global.publicPath = path.resolve("public");
import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { crosSetup } from "./helper/router-setting";
// router
import indexRouter from "./routers/index";
import userRoute from './routers/user'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(publicPath));

// use morgan to log requests to the console
app.use(morgan("dev"));

// SETUP CORS
app.use(cors());
app.use(crosSetup);

// ROUTER MAPPING.
app.use("/", indexRouter);
app.use(userRoute)

export default app;
