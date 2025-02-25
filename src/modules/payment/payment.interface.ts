interface AddonSoftware {
  name: string;
  price: number;
}

export interface IBfinitPayment extends Document {
  order_id?: string;
  name: string;
  email: string;
  address?: string;
  country: string;
  software: string;
  payment_type: string;
  price: number; // Using number instead of Double for Mongoose
  paid_amount: number;
  addone_software: AddonSoftware[]; // Updated to array of objects
  status: boolean;
  currency: string;
  duratioin: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  isDeleted: boolean;
}