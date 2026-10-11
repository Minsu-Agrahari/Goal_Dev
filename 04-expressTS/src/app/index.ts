import express from "express";
import type { Application} from "express";
import todoRouter from './todo/routes.js'

export function createServerApplication () : Application {
    const app = express();

    //? middleware
    app.use(express.json());
   app.use('/todos', todoRouter);
    
    return app;
}
