import updateProfileSchema from '../../../db_models/UpdateProfile';
import RegisterationSchema from '../../../db_models/RegisterationSchema';

export default async function handler(req, res) {
    // how to search by the posts
    // check the contents of the posts
    // get all posts from databse and tehn search it in here
    // or make a nice query and return if the contensts include a work got from
    // the front-end
 
    let {search} = req.query;
    search = String(search).trim();

    // or a simple approach woould be to use regex in mongodb

    // making a great regex before returning search results

    try {
        let queryResult;
        
        let noThisData = {password: 0, public: 0, place: 0, bio: 0, title: 0, university: 0}
        
        console.log(search, 'user')
        if (search.includes("@")){
            queryResult = await updateProfileSchema.find({"email": search}, noThisData);
        }
        else {
            queryResult = await updateProfileSchema.find({"username": search}, noThisData);
        }

        if (queryResult.length === 0 && search.includes("@")) {
            queryResult = await RegisterationSchema.find({"email": {$eq: search}});
        }

        else if (queryResult.length === 0) queryResult = await RegisterationSchema.find({"username": search})
        
        return res.status(200).json({message: "got", search_results: queryResult});

    } catch (error) {
        console.log("error searching for users. search term: %s and error: %s", search, error);
        return res.status(200).json({message: "got", search_results: queryResult});
    }
    
}