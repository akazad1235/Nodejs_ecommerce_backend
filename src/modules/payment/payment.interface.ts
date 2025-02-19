import { Double } from "mongoose";

// Define user interface
export interface IBfinitPayment extends Document {
    order_id: string;
    name: string;
    email: string;
    address?: string;
    country: string;
    software: string;
    payment_type: string;
    price: number; // Using number instead of Double for Mongoose
    addone_software: string[]; // Array of strings
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    isVerified: boolean;
    isDeleted: boolean;
  }