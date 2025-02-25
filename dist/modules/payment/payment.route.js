"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const route = express_1.default.Router();
route.get('/all', payment_controller_1.PaymentController.getAllPayment);
route.post('/payment/create', payment_controller_1.PaymentController.createBfinitPaymentSuccess);
route.get('/payment/show/:paymentId', payment_controller_1.PaymentController.showBfinitPyament);
exports.PaymentRoutes = route;
