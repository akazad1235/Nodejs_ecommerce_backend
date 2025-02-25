"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const route = express_1.default.Router();
route.get('/all', user_controller_1.UserController.getAllUser);
route.post('/user/create', user_controller_1.UserController.userCreate);
route.get('/user/show/:userId', user_controller_1.UserController.userShow);
exports.UserRoutes = route;
