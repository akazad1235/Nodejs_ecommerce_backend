"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const BitssPaymentSchema = new mongoose_1.Schema({
    order_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: false },
    country: { type: String, required: true },
    software: { type: String, required: true },
    payment_type: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});
// Create the Mongoose model
const BitssPayment = mongoose_1.default.model("BitssPayment", BitssPaymentSchema);
exports.default = BitssPayment;
