import postSchema from "../../../db_models/UserPosts";
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    // how to search by the posts
    // check the contents of the posts
    // get all posts from databse and tehn search it in here
    // or make a nice query and return if the contensts include a work got from
    // the front-end
 
    let {search} = req.query;
    let reverseSearch = search.split(" ").reverse().join(" ");
    // or a simple approach woould be to use regex in mongodb

    // making a great regex before returning search results
    
    try {

        let queryResult = await postSchema.find({});
        
        let filteredResults = [];
        let index = 0;
        
        queryResult.map( item => {
            if (item.poster.length >= 40) {
                const {email} = jwt.decode(item.poster);
                item.poster = email;

            }
            //
            if (item.content.toLowerCase().includes(search) || item.content.toLowerCase().includes(reverseSearch))
                filteredResults[index++] = item;
        });
            
        queryResult = queryResult.reverse();
        
        filteredResults = filteredResults.reverse();

        return res.status(200).json({message: "got", search_results: filteredResults});

    } catch (error) {
        console.log("error searching for posts. search term: %s and error: %s", search, error);
    }
    
}