// Route Not Found Middleware
import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customErrors';

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new CustomError(
        `Route not found. Please check the URL: ${req.originalUrl}`, // Include the full route path in the message
        404
    );
    // Pass the requested path to the error
    error.path = req.originalUrl;
    next(error);  // Passing the error to the global error handler
};

export default routeNotFound;
