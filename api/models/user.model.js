import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, 
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User