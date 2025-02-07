import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";
import { successResponse, errorResponse } from "../../utils/responseHandler";

const getAllUser = (req: Request, res: Response) => {

    return res.status(200).json({success: true, data: 'something data'});

};

const userCreate = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await UserService.createUserIntoDB(req.body);
        return successResponse(res, "User created successfully", newUser, 201);
    } catch (error) {
        next(error); // Pass error to global error handler
    }
}


export const UserController = {
    getAllUser,
    userCreate
}