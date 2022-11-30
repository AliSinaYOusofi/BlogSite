import mongoose from "mongoose";

// id should be the key
const postSchema = new mongoose.Schema( {
    
    id: {
        type: String,
        required: true,
        minLength: 1,
        immutable: false,
        unique: true
    },

    poster: {
        type: String,
        required: true,
        minLength: 1,
        validate: {
            validator: value => String(value).length >= 1,
            message: props => `${props} should be more than 1(length)`
        },
        immutable: false,
        unique: false
    },
    date: {
        type: Date,
        default: () => Date.now(),
        required: false,
    },
    content: {
        type: String,
        required: true,
        minLength: 1,
        immutable: true,
    },
    imageUrls: {
        type: Array,
        required: false,
        immutable: true,
    },
    
    comments: [
        {
            who: {
                type: String,
                required: false,
                immutable: false
            },
            when: {
                type: Date,
                default: () => Date.now(),
                required: false,
                immutable: false,
            },
            content: {
                type: String,
                required: false,
                minLength: 1,
                immutable: true,
            }
        }
    ]
} );

// how can i undrestand that this these comments are assocaited with
// should answer this before moving on. since we have different ids
// finding out which comment is no problem.

module.exports = mongoose.models.UserPosts || mongoose.model("UserPosts", postSchema);