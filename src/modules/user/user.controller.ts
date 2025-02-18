import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";
import { successResponse, errorResponse } from "../../utils/responseHandler";

const getAllUser = async(req: Request, res: Response) => {
    const result = await UserService.getAllUserIntoDB();

    return successResponse(res, "User created successfully", result, 200);

};

const userCreate = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await UserService.createUserIntoDB(req.body);
        return successResponse(res, "User created successfully", newUser, 201);
    } catch (error) {
        next(error); // Pass error to global error handler
    }
}
const userShow = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await UserService.userShowIntoDB(req.params.userId);
        return successResponse(res, "User show successfully", user, 200);
    }catch(error){
        next(error)
    }
}


export const UserController = {
    getAllUser,
    userCreate,
    userShow,
}