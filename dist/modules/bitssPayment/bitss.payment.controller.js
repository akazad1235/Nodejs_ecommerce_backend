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
const bitss_payment_services_1 = require("./bitss.payment.services");
const responseHandler_1 = require("../../utils/responseHandler");
const getAllPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bitss_payment_services_1.BitssPaymentService.getAllPaymentIntoDB();
    return responseHandler_1.successResponse(res, "Pyament retrive Successfully", result, 200);
});
const createBitssPaymentSuccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield bitss_payment_services_1.BitssPaymentService.createBitssPaymentIntoDB(req.body);
        return responseHandler_1.successResponse(res, "Payment created successfully", newUser, 201);
    }
    catch (error) {
        next(error); // Pass error to global error handler
    }
});
const showBitssPyament = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield bitss_payment_services_1.BitssPaymentService.showBitssPaymentIntoDB(req.params.userId);
        return responseHandler_1.successResponse(res, "Payment show successfully", user, 200);
    }
    catch (error) {
        next(error);
    }
});
const createBitssTpAccounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield bitss_payment_services_1.BitssPaymentService.createTpAccount(req.body);
        return responseHandler_1.successResponse(res, "Payment created successfully", newUser, 201);
    }
    catch (error) {
        next(error); // Pass error to global error handler
    }
});
exports.BitssPaymentController = {
    getAllPayment,
    createBitssPaymentSuccess,
    showBitssPyament,
    createBitssTpAccounts
};
