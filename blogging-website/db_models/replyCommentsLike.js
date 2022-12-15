// the reply likes should be like
// if already liked then increment the array of ob
// the repId should be different and unique and that should do the work
import mongoose from 'mongoose';    

const commentReplyLikes = new mongoose.Schema( {

    who: {
        type: String,
        required: true,
        immutable: true,
        unique: false
    },
    
    replyId: {
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

module.exports = mongoose.models.LikesOfCommentReplies || mongoose.model("LikesOfCommentReplies", commentReplyLikes);