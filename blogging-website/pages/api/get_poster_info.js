import postSchema from "../../db_models/UserPosts";
import jwt from 'jsonwebtoken';
import updateProfileSchema from '../../db_models/UpdateProfile'
export default async function handler(req, res) {

    const postId = req.query.postId
    
    if (!postId || req.method !== "GET") return res.status(200).json({message: "invalid post id"});

    // now that we have the postId
    // we can get the cred

    try {
        const [{poster: jwtKey}] = await postSchema.find({"id": postId});
        const {username, email} =  jwt.decode(jwtKey);
        
        // now from the username we can get other info
        // below is enough for the data
        const [{place, bio, profileUrl, title, date}] = await updateProfileSchema.find({"email": email});
        
        const posterData = [{
            username, email, place, bio, profileUrl, title, date
        }];

        return res.status(200).json({message: "found", posterData})
    } catch (error) {
        console.log(error, "get_poster_info try catch")
        return res.status(200).json({message: "getting details"});
    }
}