import mongoose from 'mongoose';    
 
const postLikes = new mongoose.Schema( {
    who: {
        type: String,
        required: true,
        immutable: true,
        unique: false
    },
    postId: {
        type: String,
        required: true,
        immutable: false,
        unique: false
    },

    loves: {
        type: Number,
        required: true,
        immutable: false,
    },
} );

module.exports = mongoose.models.blogpostsLiked || mongoose.model("blogpostsLiked", postLikes);