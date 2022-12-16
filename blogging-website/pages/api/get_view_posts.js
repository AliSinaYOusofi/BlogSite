import postSchema from '../../db_models/UserPosts';
import updateProfileSchema from '../../db_models/UpdateProfile';
import RegisterationSchema from '../../db_models/RegisterationSchema'
import jwt from 'jsonwebtoken';


export default async function handler(req, res) {
    
    let {email} = req.body;

    if (!email) return res.status(200).json({message: "invali email"});

    if (req.method !== "POST") res.status(200).json({message: "onyl get reqs || invalid token"});
   
   
    try {
        const result = await postSchema.find({});
        
        let proUsername, proBio, proTitle, proProfileUrl;
        // got the posts associated with a user
        const userPostsArray = getPostsOfTheUser(await result, email);
        // now getting the imageURL and the username for that email
        // imageURL and user is inside the profile database     

        const dataFromProfileSchema = await updateProfileSchema.find({'email': email});
        console.log(dataFromProfileSchema, '*******************************');
        if (dataFromProfileSchema.length) {
            [{username: proUsername = "", profileUrl: proProfileUrl = "", bio: proBio = "", title: proTitle = ""}] = await dataFromProfileSchema;
        } else {
            let regData = await RegisterationSchema.find({"email": email});
            [{username: proUsername = "",  bio: proBio = "", title: proTitle = ""}] = regData;
        }

        return res.status(200).json({posts: userPostsArray, userData: [{username: proUsername , profileUrl: proProfileUrl, bio: proBio, title: proTitle}]});

    } catch (error) {
        console.log(error);
    }
    
    return res.status(200).json({message: "hell"})
    
}

function getPostsOfTheUser(allPosts, email) {
    // this function will decode the jwt and return the same emails
    
    let postsOfTheUser = [];
    let index = 0;

    allPosts.forEach( (item) => {
        
        if (item.poster.length >= 30) {
            
            const {email: currentPosterEmail} = jwt.decode(item.poster);
        
            if (currentPosterEmail === email) {
                postsOfTheUser[index++] = item;
            }
        }
        
    });
    
    return postsOfTheUser;
}