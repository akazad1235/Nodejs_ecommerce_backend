"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const BfinitPaymentSchema = new mongoose_1.Schema({
    order_id: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: false },
    country: { type: String, required: true },
    software: { type: String, required: true },
    payment_type: { type: String, required: true },
    price: { type: Number, required: true },
    paid_amount: { type: Number, required: true },
    addone_software: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});
// 🚀 **Pre-Save Hook: Generate Unique `order_id` & Handle Duplicates**
BfinitPaymentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.order_id) {
                let newOrderId;
                let isDuplicate = true;
                while (isDuplicate) {
                    newOrderId = crypto_1.default.randomBytes(6).toString("hex").toUpperCase();
                    const existingOrder = yield mongoose_1.default.models.BfinitPayment.findOne({ order_id: newOrderId });
                    if (!existingOrder) {
                        isDuplicate = false;
                    }
                }
                this.order_id = newOrderId; // ✅ Now it will always be set
            }
            next(); // Proceed with saving
        }
        catch (error) {
            next(error); // Pass error to Mongoose error handler
        }
    });
});
// Create the Mongoose model
const BfinitPayment = mongoose_1.default.model("BfinitPayment", BfinitPaymentSchema);
exports.default = BfinitPayment;
