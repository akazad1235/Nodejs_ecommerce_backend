import { IUser } from './user.interface';
import User from './user.model';


const getAllUserIntoDB = () => [
    
]
const createUserIntoDB = async(payload: IUser) => {
    const newUser = new User(payload);
    return await newUser.save();
    
}

export const UserService = {
    getAllUserIntoDB,
    createUserIntoDB
}