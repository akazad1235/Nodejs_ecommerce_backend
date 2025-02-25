import mongoose, { Schema, Document, Model } from "mongoose";
import { IBitssPayment } from "./bitss.payment.interface";


const BitssPaymentSchema: Schema<IBitssPayment> = new Schema(
    {
      order_id: { type: String, required: true },
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
      isVerified: { type: Boolean, required: true, default: false },
      isDeleted: { type: Boolean, required: true, default: false },
    },
    {
      timestamps: true, // Automatically manages createdAt and updatedAt
    }
  );

  // Create the Mongoose model
const BitssPayment: Model<IBitssPayment> = mongoose.model<IBitssPayment>(
    "BitssPayment",
    BitssPaymentSchema
  );
  
  export default BitssPayment;