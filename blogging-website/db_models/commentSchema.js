import mongoose from 'mongoose';    

const commentSchema = new mongoose.Schema( { 
    postId: {
        type: String,
        required: true,
        minLength: 1,
    },
    // the commnet should have a comment id which then can be used to
    // set replies according to that
    comments: [
        {
            commentId: {
                type: String,
                required: false,
                minLength: 1,
            },
            
            who: {
                type: String,
                required: true,
                minLength: 1,
                immutable: false,
            },
            data: {
                type: String,
                required: true,
                minLength: 1,
                immutable: true,
            },
            date: {
                type: Date,
                default: () => Date.now(),
                required: false,
                immutable: false
            },
            
            likes: {
                type: "Number",
                required: false,
                immutable: false,
            },
        }
    ],
    replies: [
        {
            commentId: {
                type: String,
                required: true,
                minLength: 1,
                unique: false
            },

            replyId: { // this id is good for liking a comment. so based on the id increment the number of likes
                type: String,
                required: true,
                minLength: 1,
            },

            data: {
                type: String,
                required: true,
                minLength: 1,
                immutable: true,
            },
            
            who: {
                type: String,
                required: true,
                minLength: 1,
                immutable: false,
            },
            date: {
                type: Date,
                default: () => Date.now(),
                required: false,
                immutable: false
            },
            likes: {
                type: "Number",
                required: false,
                immutable: false,
            }
        },
    ],
    
} );

// that's it for now

module.exports = mongoose.models.PostComments ||  mongoose.model("PostComments", commentSchema);