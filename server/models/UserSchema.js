import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: "false"
    }
}, { timestamps: true });

const User = new mongoose.model('User', UserSchema);

export default User;