import express  from "express";
import { BitssPaymentController } from "./bitss.payment.controller";

const route = express.Router();

route.get('/all', BitssPaymentController.getAllPayment);
route.post('/payment/create', BitssPaymentController.createBitssPaymentSuccess);
route.get('/payment/show/:paymentId', BitssPaymentController.showBitssPyament);
route.post('/tp/account/create', BitssPaymentController.createBitssTpAccounts);

export const BitssPaymentRoutes = route;