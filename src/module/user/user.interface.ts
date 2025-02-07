
// Define user roles
export enum UserRole {
    ADMIN = "admin",
    SELLER = "seller",
    CUSTOMER = "customer",
}

// Define user interface
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    address?: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
    isVerified: boolean;
    isDeleted: boolean;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
