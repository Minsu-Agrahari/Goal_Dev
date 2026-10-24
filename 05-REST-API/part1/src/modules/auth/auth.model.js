import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // Personal Identify Information
    name: {
        type: String,
        trim: true,
        minlength: 4,
        maxlength: 50,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, "Password is required"],
        select: false
    },
    role: {
        type: String,
        trim: true,
        enum: ["Customer", "Vendor", "Admin"],
        default: "Customer",
        required: [true, "Name is required"]
    },
    isVerified: {
        type: boolean,
        default: false
    },

    // Token
    verificationToken: {
        type: String,
        select: false
    },
    refreshtoken: {
        type: String,
        select: false
    },
    resetPasswordtoken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: String,
        select: false
    }
}, {timestamps: true});

export default mongoose.model("User", userSchema);
