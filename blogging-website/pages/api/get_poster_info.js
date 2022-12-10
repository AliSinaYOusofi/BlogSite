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

        if(jwtKey.length < 30) return res.status(200).json({message: "invalid key"}); // cause i generated some dummy tokens when testing
        
        const {username, email} =  jwt.decode(jwtKey);
        
        // now from the username we can get other info
        // below is enough for the data
        let posterData;

        const queryResult = await updateProfileSchema.findOne({"email": email});
        if (queryResult) {
            let [{place = "", bio = "", profileUrl = "", title = "", date = ""}] = await queryResult;
            posterData = [{
                username, email, place, bio, profileUrl, title, date
            }];
        } else
            posterData = [{username, email, place: "", profileUrl: "", title: "", date: ""}];        

        return res.status(200).json({message: "found", posterData})
    } catch (error) {
        console.log(error, "get_poster_info try catch")
        return res.status(200).json({message: "getting details"});
    }
}