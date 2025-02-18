import express  from "express";
import { UserController } from "./user.controller";

const route = express.Router();

route.get('/all', UserController.getAllUser);
route.post('/user/create', UserController.userCreate);
route.get('/user/show/:userId', UserController.userShow);

export const UserRoutes = route;