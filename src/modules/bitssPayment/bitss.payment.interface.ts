
export interface IBitssPayment extends Document {
  order_id: string;
  name: string;
  user_name: string;
  email: string;
  address?: string;
  country: string;
  software: string;
  payment_type: string;
  price: number; // Using number instead of Double for Mongoose
  status: boolean;
  password?: string;
  currency: string;
  duratioin: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  isDeleted: boolean;
}