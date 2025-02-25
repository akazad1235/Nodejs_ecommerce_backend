import express, { Application, Request, Response } from 'express';
import errorHandler from './middlewares/errorHandler';
import routeNotFound from './middlewares/routeNotFound';

import cors from 'cors';
import router from "./app/router";
const app: Application = express();

//parser

app.use(express.json());

app.use(cors());

app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {

    const a = 10;
    //res.send(a);
    console.log(a)

});
app.use(routeNotFound);
app.use(errorHandler);
export default app;