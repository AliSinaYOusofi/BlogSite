import jwt from 'jsonwebtoken';
import postSchema from '../../db_models/UserPosts';
export default async function handler(req, res) {
    const {token} = req.query;

    console.log(token, '****************TOKEN');

    if (req.method !== "GET") res.status(200).json({message: "onyl get reqs"});

    try {
        
        // getting all posts that a user posted 
        const queryResult = await postSchema.find({'poster': token}); // all the posts if any
        // since we have not record for that token we get an empty array
        // must enter some valid key before getting the user posts.
        console.log(queryResult); // to check if it's working or not
        return res.status(200).json({message: "got the posts, you got a valid key"});
    } catch (error) {
        console.log(error, 'while fetching posts from cluster');
        return res.status(200).json({message: "queryError"});    
    }
}