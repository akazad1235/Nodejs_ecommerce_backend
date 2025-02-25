"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = __importDefault(require("../utils/customErrors"));
const routeNotFound = (req, res, next) => {
    const error = new customErrors_1.default(`Route not found. Please check the URL: ${req.originalUrl}`, // Include the full route path in the message
    404);
    // Pass the requested path to the error
    error.path = req.originalUrl;
    next(error); // Passing the error to the global error handler
};
exports.default = routeNotFound;
