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
        type: Boolean,  // meaning should be indexed when searching
        required: true,
    },

    place: {
        type: String,
        maxLength: 20,
        requried: false,
        default: "NA"
    },
    
    bio: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200,
        requried: true,
    },

    profileUrl: {
        type: String,
        required: true,
        maxLength: 100,
    },
    
    title: {
        type: String,
        maxLength: 30,
        requried: false,
        default: "NA"
    },

    university: {
        type: String,
        maxLength: 30,
        requried: false,
        default: "NA"
    },

    date: {
        type: Date,
        default: function() {
            return Date.now();
        },
        required: false,
    },
} );

module.exports =  mongoose.models.UpdatedProfile || mongoose.model("UpdatedProfile", UpdateProfileSchema);