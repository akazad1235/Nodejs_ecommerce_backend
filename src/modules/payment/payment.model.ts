import mongoose, { Schema, Document, Model } from "mongoose";
import { IBfinitPayment } from "./payment.interface";


const BfinitPaymentSchema: Schema<IBfinitPayment> = new Schema(
    {
      order_id: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: false },
      country: { type: String, required: true },
      software: { type: String, required: true },
      payment_type: { type: String, required: true },
      price: { type: Number, required: true }, // Mongoose uses 'Number'
      addone_software: { type: [String], required: true }, // Array of strings
      status: { type: Boolean, required: true },
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
const BfinitPayment: Model<IBfinitPayment> = mongoose.model<IBfinitPayment>(
    "BfinitPayment",
    BfinitPaymentSchema
  );
  
  export default BfinitPayment;