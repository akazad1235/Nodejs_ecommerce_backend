import { Request, Response } from "express";
import { UserService } from "./user.services";

const getAllUser = (req: Request, res: Response) => {

    return res.status(200).json({success: true, data: 'something data'});

};

const userCreate = async(req: Request, res: Response) => {
    let data = req.body;
   let result = await UserService.createUserIntoDB(data)

    return res.status(200).json({ success: true, data: result })
}


export const UserController = {
    getAllUser,
    userCreate
}