import express from "express"
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/auth.routes.js";
import ApiError from "./common/utils/api-error.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded ({ extended: true }));
app.use(cookieParser());


// 
app.use("/api/v1/auth", authRouter);

// 
app.all("{*path}", (req, res) => {
    throw ApiError.notfound(`Route ${req.originalUrl} not found`);
})

export default app;
