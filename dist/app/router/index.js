"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../../modules/auth/auth.route");
const user_route_1 = require("../../modules/user/user.route");
const payment_route_1 = require("../../modules/payment/payment.route");
const bitss_payment_route_1 = require("../../modules/bitssPayment/bitss.payment.route");
const router = express_1.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes
    },
    {
        path: '/payments',
        route: payment_route_1.PaymentRoutes
    },
    {
        path: '/payments/bitss/',
        route: bitss_payment_route_1.BitssPaymentRoutes
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
