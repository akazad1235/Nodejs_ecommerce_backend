"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = __importDefault(require("../../utils/customErrors"));
const payment_model_1 = __importDefault(require("./payment.model"));
const getAllPaymentIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield payment_model_1.default.find().sort({ createdAt: -1 });
});
const createBfinitPaymentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new payment_model_1.default(payload);
    return yield newUser.save();
});
// show specific user
const showPaymentIntoDB = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    //  try {
    // Try to find the user by their email
    const payment = yield payment_model_1.default.findById(paymentId); // Correct the email typo
    // If user is not found, throw a custom error
    if (!payment) {
        // User not found, throw a custom error
        throw new customErrors_1.default('Payment id not found.', 404);
    }
    return payment;
    //     return user; // Return the user if found
    // } catch (error) {
    //     // If it's a validation or type error (e.g., invalid email format)
    //     if (error instanceof mongoose.Error.CastError) {
    //         throw new CustomError('Invalid email format. Please provide a valid email address.', 400);
    //     }
    //     // Handle unexpected errors like database issues or others
    //     throw new CustomError('An unexpected error occurred while fetching the user.', 500);
    // }  
});
exports.PaymentService = {
    getAllPaymentIntoDB,
    createBfinitPaymentIntoDB,
    showPaymentIntoDB,
};
