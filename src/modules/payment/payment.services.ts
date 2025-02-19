import { NextFunction } from 'express';
import CustomError, { DuplicateEmailError } from '../../utils/customErrors';
import { IBfinitPayment } from './payment.interface';
import User from './payment.model';
import mongoose from 'mongoose';
import BfinitPayment from './payment.model';


const getAllPaymentIntoDB = async() => {
    return  await BfinitPayment.find();
    
}
const createBfinitPaymentIntoDB = async(payload: IBfinitPayment) => {

    const newUser = new BfinitPayment(payload);
    return await newUser.save();
    
}
// show specific user
const showPaymentIntoDB = async(paymentId: string) => {

  //  try {
        // Try to find the user by their email
        const payment = await BfinitPayment.findById(paymentId); // Correct the email typo
    
        // If user is not found, throw a custom error
        if (!payment) {
            // User not found, throw a custom error
            throw new CustomError('Payment id not found.', 404);
        }
        return payment;
    
    //     return user; // Return the user if found
    // } catch (error) {
    //     // If it's a validation or type error (e.g., invalid email format)
    //     if (error instanceof mongoose.Error.CastError) {
    //         throw new CustomError('Invalid email format. Please provide a valid email address.', 400);
    //     }
    
    //     // Handle unexpected errors like database issues or others
    //     throw new CustomError('An unexpected error occurred while fetching the user.', 500);
    // }  
}


export const PaymentService = {
    getAllPaymentIntoDB,
    createBfinitPaymentIntoDB,
    showPaymentIntoDB,
}