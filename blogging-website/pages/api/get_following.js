import followingUsers from "../../db_models/FollowingSchema";
import RegisterationSchema from '../../db_models/RegisterationSchema';
import UpdateProfileSchema from '../../db_models/UpdateProfile';

export default async function handler(req, res) {

    let {token} = req.query;

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    if (!token) token = "ali's account";

    try {

        let currentlyFollowing = await followingUsers.findOne({"account": token});


        if (currentlyFollowing?.following?.length) { // is following
            // TODO:
            // now for every current follower user followes i have to get the details of the one's he's
            // following from the updatprofile schmea and for each of it check if there is his data in 
            // update profile schema if not then RegeSchema be queried. thats a todo TODO
            let followers = await currentlyFollowing?.following;
            const followingList = await getFollowersInfo(followers);
    
            return res.status(200).json({message: "data", following: followingList});
        }
        return res.status(200).json({message: "0"});

    } catch (error) {
        console.log("error is_following: %s", error);
        return res.status(200).json({message: "error"});
    }
}


async function getFollowersInfo(followers) {
    
    let followersData = [];
    let index = 0;
    let profileEmail, profileImageUrl, profileUsername;

    await Promise.all( followers.map( async (item) => {
        
        const existsInUpdateProfileSchema = await UpdateProfileSchema.findOne({"email": item?.follower});
        
        if (existsInUpdateProfileSchema) {
            ({email: profileEmail = "NA", profileUrl: profileImageUrl = "https://stackdiary.com/140x100.png", username: profileUsername = "NA"} = await existsInUpdateProfileSchema)
            followersData[index++] = {profileEmail, profileImageUrl, profileUsername}
        
        } else {
            const existsInRegSchema = await RegisterationSchema.findOne({"email": item?.follower}, {"password": 0, "public" : 0});
            ({email: profileEmail, profileUrl: profileImageUrl = "https://stackdiary.com/140x100.png", username: profileUsername = "NA"} = await existsInRegSchema)
            followersData[index++] = {profileEmail, profileImageUrl, profileUsername}
        }
    })) 
    return followersData;
}