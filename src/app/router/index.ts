import { Router } from 'express';
import {AuthRoutes} from "../../modules/auth/auth.route";
import { UserRoutes } from '../../modules/user/user.route';
import { PaymentRoutes } from '../../modules/payment/payment.route';
import { BitssPaymentRoutes } from '../../modules/bitssPayment/bitss.payment.route';


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/payments',
        route: PaymentRoutes
    },
    {
        path: '/payments/bitss/',
        route: BitssPaymentRoutes
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
