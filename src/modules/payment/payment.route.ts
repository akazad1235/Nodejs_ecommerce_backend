import express  from "express";
import { PaymentController } from "./payment.controller";

const route = express.Router();

route.get('/all', PaymentController.getAllPayment);
route.post('/payment/create', PaymentController.createBfinitPaymentSuccess);
route.get('/payment/show/:paymentId', PaymentController.showBfinitPyament);

export const PaymentRoutes = route;