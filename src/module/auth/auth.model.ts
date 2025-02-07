import {model, Schema} from "mongoose";
import TUser from "./auth.interface";

const userSchema = new Schema({
   name: {
       type: String,
       required: true
   },
    email: {
       type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
    },
    status: {
       type: Boolean,
        default: true,
    }
},
    {
        timestamps: true,
    }
    )

export const User = model<TUser>('User', userSchema);