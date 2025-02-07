import { Request, RequestHandler, Response } from 'express';
const register = (req:Request, res: Response) => {
    const body = req.body;
    return res.json(body);
}

export const AuthController = {
    register
}