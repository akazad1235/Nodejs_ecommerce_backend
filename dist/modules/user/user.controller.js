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
Object.defineProperty(exports, "__esModule", { value: true });
const user_services_1 = require("./user.services");
const responseHandler_1 = require("../../utils/responseHandler");
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserService.getAllUserIntoDB();
    return responseHandler_1.successResponse(res, "User created successfully", result, 200);
});
const userCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield user_services_1.UserService.createUserIntoDB(req.body);
        return responseHandler_1.successResponse(res, "User created successfully", newUser, 201);
    }
    catch (error) {
        next(error); // Pass error to global error handler
    }
});
const userShow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_services_1.UserService.userShowIntoDB(req.params.userId);
        return responseHandler_1.successResponse(res, "User show successfully", user, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.UserController = {
    getAllUser,
    userCreate,
    userShow,
};
