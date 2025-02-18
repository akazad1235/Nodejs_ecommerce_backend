import { NextFunction } from 'express';
import CustomError, { DuplicateEmailError } from '../../utils/customErrors';
import { IUser } from './user.interface';
import User from './user.model';
import mongoose from 'mongoose';


const getAllUserIntoDB = async() => {
    return  await User.find();
    
}
const createUserIntoDB = async(payload: IUser) => {
    const existingEmail = await User.findOne({email: payload.email});
    if(existingEmail){
        throw new DuplicateEmailError();
    }
    const newUser = new User(payload);
    return await newUser.save();
    
}
// show specific user
const userShowIntoDB = async(userId: string) => {

  //  try {
        // Try to find the user by their email
        const user = await User.findById(userId); // Correct the email typo
    
        // If user is not found, throw a custom error
        if (!user) {
            // User not found, throw a custom error
            throw new CustomError('User not found. Please check the email address.', 404);
        }
        return user;
    
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


export const UserService = {
    getAllUserIntoDB,
    createUserIntoDB,
    userShowIntoDB,
}