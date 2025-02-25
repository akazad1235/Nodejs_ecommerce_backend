"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bitss_payment_controller_1 = require("./bitss.payment.controller");
const route = express_1.default.Router();
route.get('/all', bitss_payment_controller_1.BitssPaymentController.getAllPayment);
route.post('/payment/create', bitss_payment_controller_1.BitssPaymentController.createBitssPaymentSuccess);
route.get('/payment/show/:paymentId', bitss_payment_controller_1.BitssPaymentController.showBitssPyament);
route.post('/tp/account/create', bitss_payment_controller_1.BitssPaymentController.createBitssTpAccounts);
exports.BitssPaymentRoutes = route;
