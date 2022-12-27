import updateProfileSchema from '../../../db_models/UpdateProfile';
import RegisterationSchema from '../../../db_models/RegisterationSchema';
import { sleep } from '../../../components/global/sleep';

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
    await sleep(1000);
    
    try {
        let queryResult;
        
        let noThisData = {password: 0, public: 0, place: 0, bio: 0, title: 0, university: 0}
        
        console.log(search, 'user')
        if (search.includes("@")){
            queryResult = await updateProfileSchema.find({}, noThisData);
            queryResult = queryResult.filter( item => String(item.email).startsWith(search) || String(item.username).endsWith(search));

        }
        else {
            queryResult = await updateProfileSchema.find({}, noThisData);
            queryResult = queryResult.filter( item => String(item.username).startsWith(search) || String(item.username).endsWith(search));

        } 

        if (queryResult.length === 0 && search.includes("@")) {
            queryResult = await RegisterationSchema.find({}, {"password": 0, "public": 0});
            queryResult = queryResult.filter( item => String(item?.email).startsWith(search) || String(item?.email).endsWith(search));
            console.log("searching by email", queryResult);
        }

        else if (queryResult.length === 0) {
            queryResult = await RegisterationSchema.find({}, {"password": 0, "public": 0});
            queryResult = queryResult.filter( item => String(item.username).startsWith(search) || String(item.username).endsWith(search));
        }
        
        if (!queryResult) queryResult = [];
        return res.status(200).json({message: queryResult.length ? "got" : "na", search_results: queryResult});

    } catch (error) {
        console.log("error searching for users. search term: %s and error: %s", search, error);
        return res.status(200).json({message: "got"});
    }
    
}