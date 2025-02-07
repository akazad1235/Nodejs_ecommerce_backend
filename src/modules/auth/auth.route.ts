import express from 'express';
import {AuthController} from "./auth.controller";
const router = express.Router();

router.post(
    '/user/register',
    AuthController.register,
);

export const AuthRoutes = router;
