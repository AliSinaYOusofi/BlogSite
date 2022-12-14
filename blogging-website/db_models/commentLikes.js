import mongoose from 'mongoose';    

const commentLikes = new mongoose.Schema( {
    
    who: {
        type: String,
        required: true,
        immutable: true,
        unique: false
    },

    commentId: {
        type: String,
        required: true,
        immutable: false,
    },

    loves: {
        type: Number,
        required: true,
        immutable: false,
    },
} );

module.exports = mongoose.models.LikesOfComments || mongoose.model("LikesOfComments", commentLikes);