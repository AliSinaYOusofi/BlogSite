import mongoose from 'mongoose';    

const savedPosts = new mongoose.Schema( {
    
    account: {
        type: String,
        required: true,
        minLength: 1,
    },
    savedPosts: [
        {
            postId: {
                type: String,
                required: true,
                minLength: 1,
            }
        }
    ]
} );

module.exports = mongoose.models.mysavedposts||  mongoose.model("mysavedposts", savedPosts);