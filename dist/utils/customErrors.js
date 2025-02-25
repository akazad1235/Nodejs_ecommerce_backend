"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Base class for custom errors
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
// Validation error (e.g., missing fields)
class ValidationError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
// Duplicate email error
class DuplicateEmailError extends CustomError {
    constructor() {
        super("Email already exists. Please use a different email.", 409);
    }
}
exports.DuplicateEmailError = DuplicateEmailError;
// Not found error (e.g., user not found)
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
// Unauthorized error
class UnauthorizedError extends CustomError {
    constructor() {
        super("Unauthorized access", 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
exports.default = CustomError;
