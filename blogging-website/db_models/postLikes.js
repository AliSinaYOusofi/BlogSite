import mongoose from 'mongoose';    

const postLikes = new mongoose.Schema( {
    postId: {
        type: String,
        required: true,
        immutable: false,
        unique: true
    },

    loves: {
        type: Number,
        required: true,
        immutable: false,
    },
} );

module.exports = mongoose.models.postLikes || mongoose.model("postLikes", postLikes);