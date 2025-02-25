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
const payment_services_1 = require("./payment.services");
const responseHandler_1 = require("../../utils/responseHandler");
const getAllPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_services_1.PaymentService.getAllPaymentIntoDB();
    return responseHandler_1.successResponse(res, "Pyament get Successfully", result, 200);
});
const createBfinitPaymentSuccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield payment_services_1.PaymentService.createBfinitPaymentIntoDB(req.body);
        return responseHandler_1.successResponse(res, "Payment created successfully", newUser, 201);
    }
    catch (error) {
        next(error); // Pass error to global error handler
    }
});
const showBfinitPyament = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield payment_services_1.PaymentService.showPaymentIntoDB(req.params.userId);
        return responseHandler_1.successResponse(res, "Payment show successfully", user, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.PaymentController = {
    getAllPayment,
    createBfinitPaymentSuccess,
    showBfinitPyament,
};
