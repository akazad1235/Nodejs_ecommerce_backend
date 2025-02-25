import { NextFunction, Request, Response } from "express";
import { BitssPaymentService } from "./bitss.payment.services";
import { successResponse, errorResponse } from "../../utils/responseHandler";

const getAllPayment = async(req: Request, res: Response) => {

    const result = await BitssPaymentService.getAllPaymentIntoDB();
    return successResponse(res, "Pyament retrive Successfully", result, 200);

};

const createBitssPaymentSuccess = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await BitssPaymentService.createBitssPaymentIntoDB(req.body);
        return successResponse(res, "Payment created successfully", newUser, 201);
    } catch (error) {
        next(error); // Pass error to global error handler
    }
}
const showBitssPyament= async(req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await BitssPaymentService.showBitssPaymentIntoDB(req.params.userId);
        return successResponse(res, "Payment show successfully", user, 200);
    }catch(error){
        next(error)
    }
}
const createBitssTpAccounts = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await BitssPaymentService.createTpAccount(req.body);
        return successResponse(res, "Payment created successfully", newUser, 201);
    } catch (error) {
        next(error); // Pass error to global error handler
    }
}


export const BitssPaymentController = {
    getAllPayment,
    createBitssPaymentSuccess,
    showBitssPyament,
    createBitssTpAccounts
}