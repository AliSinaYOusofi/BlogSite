import jwt from 'jsonwebtoken';
import postSchema from '../../db_models/UserPosts';
import updateProfileSchema from '../../db_models/UpdateProfile';
import RegisterationSchema from '../../db_models/RegisterationSchema';

export default async function handler(req, res) {
    
    const {token} = req.query;

    if (!token) return res.status(200).json({message: "invali token"});

    if (req.method !== "GET" || ! token) res.status(200).json({message: "onyl get reqs || invalid token"});

    const {email: profileEmail} = jwt.decode(token);

    try {
        
        // getting all posts that a user posted 
        const queryResult = await postSchema.find({}, { 'comments': 0}); // all the posts if any
        
        console.log(queryResult);
        // since we have not record for that token we get an empty array
        // must enter some valid key before getting the user posts.

        // got the posts associated with a user
        const userPostsArray = getPostsOfTheUser(queryResult, profileEmail);
        // now getting the imageURL and the username for that email
        // imageURL and user is inside the profile database

        const dataForuser = await updateProfileSchema.find({'email': profileEmail});
        
        let username, profileUrl, bio, title = '';
        
        if (dataForuser) {
            [{username = "", profileUrl = "", bio = "", title = ""}] = await RegisterationSchema.findOne({"email": profileEmail});
        
        } else {
            let regData = await RegisterationSchema.findOne({'email': profileEmail}, {'username': 1});

            if (regData) {
                [{username = ""}] = await regData;
                profileUrl, bio, title = '';
            }
        }// if user have'nt updated the profile than we must query the regSchema
        
        
        // now i must compare them and return the resulst that match the email
        console.log("*******************************");
        console.log(username, profileUrl, bio, title);
        console.log("*******************************");

        console.log("*******************************");
        console.log(userPostsArray);
        console.log("*******************************");

        return res.status(200).json({posts: [userPostsArray], userData: [{username, profileUrl, bio, title}]});
    } catch (error) {
        console.log(error, 'while fetching posts from cluster');
        return res.status(200).json({message: "queryError"});    
    }
}

function getPostsOfTheUser(allPosts, email) {
    // this function will decode the jwt and return the same emails
    
    let postsOfTheUser = [];
    let index = 0;

    allPosts.forEach( (item) => {
        
        if (item.poster.length >= 30) {
            
            const {email: currentPosterEmail} = jwt.decode(item.poster);
            console.log(currentPosterEmail, email, '*************');

            if (currentPosterEmail === email) {
                postsOfTheUser[index++] = item;
                console.log(postsOfTheUser, '**************************', email, currentPosterEmail);
            }
        }
        
    });
    removeImageLinksFromText(postsOfTheUser);
    return postsOfTheUser;
}


// remove image links before sending it to the user
const removeImageLinksFromText = (text) => {
        
    let copyContent = ''
    
    text.forEach( posts => {
        posts.content.split("\n").forEach(lines => {
            if (!lines.startsWith("![]")) {
                copyContent += lines;
                posts.text = copyContent;
            }
        });
    });
};