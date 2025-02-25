"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const routeNotFound_1 = __importDefault(require("./middlewares/routeNotFound"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./app/router"));
const app = express_1.default();
//parser
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/api/v1', router_1.default);
app.get('/', (req, res) => {
    const a = 10;
    //res.send(a);
    console.log(a);
});
app.use(routeNotFound_1.default);
app.use(errorHandler_1.default);
exports.default = app;
