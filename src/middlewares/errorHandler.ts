import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/customErrors";

// Global error handler
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // Default to 500 Internal Server Error
    return res.status(500).json({
        success: false,
        message: "Something went wrong, please try again.",
    });
};

export default errorHandler;
