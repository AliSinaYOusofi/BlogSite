import mongoose from "mongoose";

const UpdateProfileSchema = new mongoose.Schema( {
    email: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        lowercase: true,
        validate: {
            validator: value => String(value).length >= 1,
            message: props => `${props} should be more than 1(length)`
        },
        immutable: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        lowercase: true,
        immutable: true
    },

    password: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 70,
    },

    
    public: {
        type: Boolean,
        default: true, // meaning should be indexed when searching
        required: true,
    },
    date: {
        type: Date,
        default: function() {
            return Date.now();
        },
        required: false,
    },
} )