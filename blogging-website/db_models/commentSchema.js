import mongoose from 'mongoose';    

const commentSchema = new mongoose.Schema( { 
    postId: {
        type: String,
        required: true,
        minLength: 1,
    },

    comments: [
        {
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
                type: Number,
                required: false,
                immutable: true,
            },
        }
    ],
    replies: [
        {
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
                type: Number,
                required: false,
                immutable: true,
            }
        },
    ],
    
} );

// that's it for now

module.exports = mongoose.models.Comments ||  mongoose.model("Comments", commentSchema);