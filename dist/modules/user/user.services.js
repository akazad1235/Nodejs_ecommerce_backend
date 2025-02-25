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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = __importStar(require("../../utils/customErrors"));
const user_model_1 = __importDefault(require("./user.model"));
const getAllUserIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.find();
});
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmail = yield user_model_1.default.findOne({ email: payload.email });
    if (existingEmail) {
        throw new customErrors_1.DuplicateEmailError();
    }
    const newUser = new user_model_1.default(payload);
    return yield newUser.save();
});
// show specific user
const userShowIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //  try {
    // Try to find the user by their email
    const user = yield user_model_1.default.findById(userId); // Correct the email typo
    // If user is not found, throw a custom error
    if (!user) {
        // User not found, throw a custom error
        throw new customErrors_1.default('User not found. Please check the email address.', 404);
    }
    return user;
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
exports.UserService = {
    getAllUserIntoDB,
    createUserIntoDB,
    userShowIntoDB,
};
