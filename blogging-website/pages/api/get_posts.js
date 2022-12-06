import jwt from 'jsonwebtoken';
import postSchema from '../../db_models/UserPosts';
import updateProfileSchema from '../../db_models/UpdateProfile';
export default async function handler(req, res) {
    const {token} = req.query;

    console.log(token, '****************TOKEN');

    if (req.method !== "GET" || ! token) res.status(200).json({message: "onyl get reqs || invalid token"});

    const {email: profileEmail} = jwt.decode(token);

    try {
        
        // getting all posts that a user posted 
        const queryResult = await postSchema.find({}, { 'comments': 0}); // all the posts if any
        // since we have not record for that token we get an empty array
        // must enter some valid key before getting the user posts.

        // got the posts associated with a user
        const userPostsArray = getPostsOfTheUser(queryResult, profileEmail);
        // now getting the imageURL and the username for that email
        // imageURL and user is inside the profile database

        const [{username, profileUrl, bio, title}] = await updateProfileSchema.find({'email': profileEmail});
        
        console.log(userPostsArray, 'GOTOIJSLKDF:JLKSDJF:KLSDJFL');
        // now i must compare them and return the resulst that match the email
        return res.status(200).json({posts: userPostsArray, username, profileUrl, profileEmail, bio, title});
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
            if (currentPosterEmail === email)
                postsOfTheUser[index++] = item;
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