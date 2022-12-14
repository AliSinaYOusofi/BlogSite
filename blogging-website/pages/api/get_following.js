import followingUsers from "../../db_models/FollowingSchema";
import RegisterationSchema from '../../db_models/RegisterationSchema';
import UpdateProfileSchema from '../../db_models/UpdateProfile';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {

    // this should not be the token since it's from the person currently logged in
    // i should get the email and from the email i should get the following list.

    let {email} = req.query;

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    try {

        let currentlyFollowing = await followingUsers.find({});
        
        let thisFollowsLists = getTokenFromEmail(currentlyFollowing, email);
        
        
        let followerData = await getFollowersInfo(thisFollowsLists[0]);
        
        if (thisFollowsLists?.length) { // is following
            // TODO:
            // now for every current follower user followes i have to get the details of the one's he's
            // following from the updatprofile schmea and for each of it check if there is his data in 
            // update profile schema if not then RegeSchema be queried. thats a todo TOD
            return res.status(200).json({message: "data", following: followerData});
        }
        return res.status(200).json({message: "0"});

    } catch (error) {
        console.log("error is_following: %s", error);
        return res.status(200).json({message: "error"});
    }
}

function getTokenFromEmail(allFollowing, email) {
    // this function will decode the jwt and return the same emails
    
    let postsOfTheUser = [];
    let index = 0;

    allFollowing.forEach( (item) => {
        
        if (item.account?.length >= 30) {
            
            const {email: currentPosterEmail} = jwt.decode(item.account);
        
            if (currentPosterEmail === email) {
                postsOfTheUser[index] = item.following
                return;
            }
        }
        
    });
    
    return postsOfTheUser;
}


async function getFollowersInfo(followers) {
    
    let followersData = [];
    let index = 0;
    let profileEmail, profileUsername, profileImageUrl = "https://stackdiary.com/140x100.png";

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