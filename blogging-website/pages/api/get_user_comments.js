import commentSchema from '../../db_models/commentSchema';
import UpdateProfileSchema from '../../db_models/UpdateProfile';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    

    // a get req will come
    // take the token make a query of profileScheam get
    // username and profile url

    // take the postId and make a query on commentSchema and get
    // comments section.
    // that will give a number of who filed that you should take and make another
    // query on the profileSchema to get their username and profileUrl for every one of
    // the who field

    const {postId} = req.query;

    try {
        const commentsOnAPost = await commentSchema.find({'postId': postId});
        
        if (!commentsOnAPost.length) return res.status(200).json({message: "no comment on this post"});
        
        // now we have the comments and replies on sepearate vars
        // for every field of who i must make another query and get
        // the username and profile of that username;
        let [{comments, replies, likes}] = await commentsOnAPost;
        
        // the structure of the object should be like
        // {image, usernname, date, and content};
        
        let freshComments = [];
        comments = comments.toObject(); // took about 1.4 hours to solve this
        // so you need to just convert to a basic object
        // this result retruns a complex object and includes all the methods
        // so we just want the object thats the answer from stackoverflow.com

        for (let i = 0; i < comments.length; i++) {
            
            const {email = "", username = ""} = jwt.decode(comments[i].who);
            
            let profileUrl = await getProfileUrl(email);

            freshComments[i] = comments[i];
            freshComments[i].username = username;
            freshComments[i].profileUrl = profileUrl;
        }    
        // forgot the likes part of the comment

        replies = replies.toObject();
        let freshReplies = [];
        for (let i = 0; i < replies.length; i++) {
            
            const {email = "", username = ""} = jwt.decode(replies[i].who);
            
            let profileUrl = await getProfileUrl(email);

            freshReplies[i] = replies[i];
            freshReplies[i].username = username;
            freshReplies[i].profileUrl = profileUrl;
        }    

        console.log(comments);
        return res.status(200).json({comments: freshComments, replies: freshReplies});

    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "error"});
    }
   
}


async function getProfileUrl (email) {
    let profileUrl;
    try {
        profileUrl = await UpdateProfileSchema.findOne({"email": email}, {"profileUrl": 1});
        console.log(profileUrl);
    } catch(error) { console.log("Error: getProfielUrl: %s", error);}
    return await profileUrl;
}