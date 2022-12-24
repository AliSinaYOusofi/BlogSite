import postSchema from "../../db_models/UserPosts";
import connection from '../../db_connection/mongoose.db.config';
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    // this function will take the postId from params and return 3x posts
    // from the same user;

    // postDate, title, content, id

    // use the id to get the jwtToken, and return three of the posts
    
    if (req.method !== "GET") return res.status(200).json({message: "only get Reqs"})
    
    await connection();
   
    try {
        // search an find recent posts and send it
        // check the dates
        

        // how 2 get those data with latest dates
        // using aggeragation

        // getting posts from 2-weeks before now
        let twoWeeksBefore = new Date();
        twoWeeksBefore.setDate(twoWeeksBefore.getDate() - 14);
        
        // my cluster is not working. IDK why it is down.
        let queryResult = await postSchema.find({'date': { $gte: new Date(twoWeeksBefore) } });
        
        queryResult.map( item => {
            if (item.poster.length >= 40) {
                const {email} = jwt.decode(item.poster);
                item.poster = email;
            }
          });
        
        queryResult = queryResult.reverse();
        if (queryResult.length >= 6)
            queryResult.length = 5;

        return res.status(200).json({message: 'done', latestPosts: queryResult}); // thats a good boy      
    
    } catch (error) {
        console.log("Failed to get post given the post %s", error);
        return res.status(200).json({message: "queryError"})
    }
}