"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register = (req, res) => {
    const body = req.body;
    return res.json(body);
};
exports.AuthController = {
    register
};
