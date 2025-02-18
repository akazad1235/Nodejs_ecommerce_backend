// Base class for custom errors
class CustomError extends Error {
    statusCode: number;
    path?: string; 

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Validation error (e.g., missing fields)
export class ValidationError extends CustomError {
    constructor(message: string) {
        super(message, 400);
    }
}

// Duplicate email error
export class DuplicateEmailError extends CustomError {
    constructor() {
        super("Email already exists. Please use a different email.", 409);
    }
}

// Not found error (e.g., user not found)
export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404);
    }
}

// Unauthorized error
export class UnauthorizedError extends CustomError {
    constructor() {
        super("Unauthorized access", 401);
    }
}

export default CustomError;
