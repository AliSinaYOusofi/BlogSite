import mongoose from 'mongoose';    


// accounts that a user follows
const followingUsers = new mongoose.Schema( {
    
    account: {
        type: String,
        required: true,
        minLength: 1,
    },

    following: [
        {
            follower: { // is a jwt token
                type: String,
                required: true,
                minLength: 1,
            }
        }
    ]
} );

module.exports = mongoose.models.IFollow ||  mongoose.model("IFollow", followingUsers);