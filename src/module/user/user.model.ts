import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser, UserRole } from "./user.interface";
import bcrypt from "bcrypt";

// Define user schema
const UserSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true }, // Hashed password
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.CUSTOMER,
        },
        address: { type: String },
        phone: { 
            type: String, 
            validate: {
                validator: function (v: string) {
                    return /^\+?[1-9]\d{1,14}$/.test(v); // Validates international phone format
                },
                message: "Invalid phone number format"
            }
        },
        isVerified: { type: Boolean, default: false }, // Email verification flag
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);

// 🔒 Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip hashing if password is unchanged

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error as Error);
    }
});

// 🔐 Compare entered password with hashed password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// ✅ Filter out soft deleted users by default
UserSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false }); // Automatically exclude deleted users
    next();
});

// Create User model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
