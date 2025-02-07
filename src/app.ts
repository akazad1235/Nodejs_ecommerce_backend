import express, { Application, Request, Response } from 'express';

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
export default app;