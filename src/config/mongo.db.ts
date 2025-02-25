import mongoose from "mongoose";

//const MONGO_URI = "mongodb://localhost:27017/ecommerce"; // Change to your MongoDB URL
const MONGO_URI = "mongodb://bfinitPaymentUser:bfinitPaymentUserPassword@92.204.40.140:27017/bfinitPayment"; // Change to your MongoDB URL

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🟢 MongoDB Connected Successfully");
    } catch (error) {
        console.error("🔴 MongoDB Connection Error:", error);
    }
};