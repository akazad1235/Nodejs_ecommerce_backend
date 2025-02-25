import mongoose, { Schema, Document, Model } from "mongoose";
import { IBitssPayment } from "./bitss.payment.interface";
import crypto from "crypto";


const BitssPaymentSchema: Schema<IBitssPayment> = new Schema(
    {
      order_id: { type: String, unique: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: false },
      country: { type: String, required: true },
      software: { type: String, required: true },
      payment_type: { type: String, required: true },
      price: { type: Number, required: true }, // Mongoose uses 'Number'
      status: { type: Boolean, default: false},
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      currency: { type: String, required: true},
      duratioin: { type: String, required: true},
      isVerified: { type: Boolean, required: true, default: false },
      isDeleted: { type: Boolean, required: true, default: false },
    },
    {
      timestamps: true, // Automatically manages createdAt and updatedAt
    }
  );
  // 🚀 **Pre-Save Hook: Generate Unique `order_id` & Handle Duplicates**
  BitssPaymentSchema.pre<IBitssPayment>("save", async function (next) {
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
const BitssPayment: Model<IBitssPayment> = mongoose.model<IBitssPayment>(
    "BitssPayment",
    BitssPaymentSchema
  );
  
  export default BitssPayment;