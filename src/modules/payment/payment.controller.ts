import { NextFunction, Request, Response } from "express";
import { PaymentService } from "./payment.services";
import { successResponse, errorResponse } from "../../utils/responseHandler";

const getAllPayment = async(req: Request, res: Response) => {

    const result = await PaymentService.getAllPaymentIntoDB();
    return successResponse(res, "Pyament get Successfully", result, 200);

};

const createBfinitPaymentSuccess = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await PaymentService.createBfinitPaymentIntoDB(req.body);
        return successResponse(res, "Payment created successfully", newUser, 201);
    } catch (error) {
        next(error); // Pass error to global error handler
    }
}
const showBfinitPyament= async(req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await PaymentService.showPaymentIntoDB(req.params.userId);
        return successResponse(res, "Payment show successfully", user, 200);
    }catch(error){
        next(error)
    }
}


export const PaymentController = {
    getAllPayment,
    createBfinitPaymentSuccess,
    showBfinitPyament,
}