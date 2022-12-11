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

    console.log(postId);

    try {
        const commentsOnAPost = await commentSchema.find({'postId': postId});
       
        if (!commentsOnAPost.length) return res.status(200).json({message: "no comment on this post"});
        
        // now we have the comments and replies on sepearate vars
        // for every field of who i must make another query and get
        // the username and profile of that username;
        let [{comments, replies}] = await commentsOnAPost;
        
        
        // the structure of the object should be like
        // {image, usernname, date, and content};
        
        let freshComments = [];
        comments = comments.toObject(); // took about 1.4 hours to solve this
        // so you need to just convert to a basic object
        // this result retruns a complex object and includes all the methods
        // so we just want the object thats the answer from stackoverflow.com
        replies = replies.toObject();

        let freshReplies = [];
        for (let i = 0; i < replies.length; i++) {
            
            if (replies[i].who.length <= 30) continue;

            const {email = "", username = ""} = jwt.decode(replies[i].who);
            
            let profileUrl = await getProfileUrl(email);

            freshReplies[i] = replies[i];
            freshReplies[i].username = username;
            freshReplies[i].profileUrl = profileUrl;
        }
        let forReplyCordination = [];
        let repplyCordinationCounter = 0;

        for (let i = 0; i < comments.length; i++) {
            
            const {email = "", username = ""} = jwt.decode(comments[i].who);
            
            let profileUrl = await getProfileUrl(email);

            freshComments[i] = comments[i];

            // then for every comment reply i will go and search for every one of it
            // if the the replyCommentId === commentId then i will append it to the
            // add them as object then check the type if type array of objs then
            // pass that as well to the ReplyComments compoonennts

            for(let index = 0; index < freshReplies.length; index++) {
              
                if (freshComments[i].commentId === freshReplies[index].commentId) {
                    forReplyCordination[repplyCordinationCounter++] = freshReplies[index];

                    
                    // if there is another comment then push it otherwise create one
                    if (freshComments[i].reply)
                        freshComments[i].reply.push(freshReplies[index]);
                    else
                        freshComments[i].reply = [freshReplies[index]];
                    
                        forReplyCordination = [];
                    repplyCordinationCounter = 0;
                }
            }
            freshComments[i].username = username;
            freshComments[i].profileUrl = profileUrl;
            // if the comment id and reply id match then insert and array of objects
            // to the freshComments 
        }    
        // forgot the likes part of the comment

        // how to add the reply of the commments
        // i have comment id
        // query the db with commentId and save it under replies var 

             
        // how to know the specifc comment had replies
        // thats the bug to solve now
        console.log(freshComments);
        
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
    } catch(error) { console.log("Error: getProfielUrl: %s", error);}
    return await profileUrl;
}


/// ok that's it we got the comment and the reply in sthe same order.
// now we need to send them back to the server.
// and the reply is sorted so no need for additional sorting.