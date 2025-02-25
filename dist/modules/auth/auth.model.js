"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});
exports.User = mongoose_1.model('User', userSchema);
