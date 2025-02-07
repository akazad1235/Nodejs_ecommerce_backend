import { DuplicateEmailError } from '../../utils/customErrors';
import { IUser } from './user.interface';
import User from './user.model';


const getAllUserIntoDB = () => [
    
]
const createUserIntoDB = async(payload: IUser) => {
    const existingEmail = await User.findOne({email: payload.email});
    if(existingEmail){
        throw new DuplicateEmailError();
    }
    const newUser = new User(payload);
    return await newUser.save();
    
}

export const UserService = {
    getAllUserIntoDB,
    createUserIntoDB
}