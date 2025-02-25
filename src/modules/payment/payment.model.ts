import mongoose, { Schema, Document, Model } from "mongoose";
import { IBfinitPayment } from "./payment.interface";
import crypto from "crypto";

const BfinitPaymentSchema: Schema<IBfinitPayment> = new Schema(
  {
    order_id: { type: String, unique: true }, // ✅ Ensure required
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
    currency: { type: String, required: true},
    duratioin: { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// 🚀 **Pre-Save Hook: Generate Unique `order_id` & Handle Duplicates**
BfinitPaymentSchema.pre<IBfinitPayment>("save", async function (next) {
  try {
    if (!this.order_id) {
      let newOrderId;
      let isDuplicate = true;

      while (isDuplicate) {
        newOrderId = crypto.randomBytes(6).toString("hex").toUpperCase();
        const existingOrder = await mongoose.models.BfinitPayment.findOne({ order_id: newOrderId });

        if (!existingOrder) {
          isDuplicate = false;
        }
      }
      this.order_id = newOrderId; // ✅ Now it will always be set
    }
    next(); // Proceed with saving
  } catch (error: any) {
    next(error); // Pass error to Mongoose error handler
  }
});

// Create the Mongoose model
const BfinitPayment: Model<IBfinitPayment> = mongoose.model<IBfinitPayment>(
  "BfinitPayment",
  BfinitPaymentSchema
);

export default BfinitPayment;
