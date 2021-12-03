import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    display_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    TTL: {
        type: String,
        default: Math.floor(Math.random() * (900 - 100 + 1)) + 100
    },
    token: {
        type: String
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export const User = new mongoose.model('user', UserSchema);