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
        
        // now we have the comments and replies on sepearate vars
        // for every field of who i must make another query and get
        // the username and profile of that username;
        let [{comments, replies}] = await commentsOnAPost;
        
        // the structure of the object should be like
        // {image, usernname, date, and content};

        // now for every field of who:
        
        let commentsToSend = [ { } ];

        comments.map( (item, index) => {
            if (item.who.length >= 30) {
                // decode the jwt, get the email, call func and get the profile url
                const {email, username} = jwt.decode(item.who);
                console.log(email, username, '********************GOTIT');
                let profileUrl = getProfileUrl(email);
            }
        });

        return res.status(200).json({message: "pending"});

    } catch (error) {
        
    }
    res.status(200).json({message: "date"});
}


async function getProfileUrl (email) {
    let profileUrl;
    try {
        profileUrl = await UpdateProfileSchema.findOne({"email": email}, {"profileUrl": 1});
        console.log(profileUrl);
    } catch(error) { console.log("Error: getProfielUrl: %s", error);}
    return profileUrl;
}