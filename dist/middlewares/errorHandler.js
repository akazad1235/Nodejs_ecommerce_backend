"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customErrors_1 = __importDefault(require("../utils/customErrors"));
const globalErrorHandler = (err, req, res, next) => {
    console.error("🔥 Error Details:", err); // Log full error details for debugging
    const statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!';
    let errorSource = [{ path: err.path || req.originalUrl, message: message }]; // Use err.path, or fallback to req.originalUrl if not set
    // Handle CastError for invalid ObjectId
    if (err.name === 'CastError' && err.path === '_id') {
        message = 'The provided ID is invalid.';
        errorSource = [
            {
                path: '_id',
                message: 'Please ensure the user ID is correct and try again.',
            },
        ];
    }
    // If it's a route not found error
    if (err.message === 'Route not found. Please check the URL.') {
        message = `The requested route ${req.originalUrl} does not exist.`;
    }
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        // Handle Mongoose validation errors
        message = 'mongoose validation error';
        errorSource = Object.values(err.errors).map((error) => ({
            path: error.path,
            message: error.message,
        }));
    }
    // Handle custom errors
    if (err instanceof customErrors_1.default) {
        message = err.message;
        errorSource = [
            {
                path: req.originalUrl || err.path,
                message: err.message,
            },
        ];
    }
    // Return the response with the custom message
    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        error: {},
    });
};
exports.default = globalErrorHandler;
