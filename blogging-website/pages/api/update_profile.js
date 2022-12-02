import connection from "../../db_connection/mongoose.db.config";
import jwt from 'jsonwebtoken';
import RegisterationSchema from '../../db_models/RegisterationSchema';
import UpdateProfileSchema from '../../db_models/UpdateProfile';

// function to return the details of the given email

async function getDetailsGivenEmail(email) {
    try {
        let queryResult = await RegisterationSchema.find({'email': email});
        return queryResult;
    } catch (error) { return }
}



// so now i'm having an error
    // bcuase when updating the db we actually insert
    // for we first will check if users exists if exists update the db
    // otherwise insert into the db

// and that's why we have this function


async function findEmailDuplicates(field) {
    // checking if email already exists
    let exists;
    try {
        exists = await UpdateProfileSchema.exists({email: field});
    } catch (error) { console.log(error, "error on findEmailDups function()")}
    console.log(exists, "fucking exists or not");
    return await exists;
}


export default async function handler(req, res) {
    
    let {
        token,
        username,
        password,
        visibility,
        place,
        bio,
        university,
        profileUrl,
        jobTitle
    } = req.body.dataToSend; // got the data

    console.log(token,
        username,
        password,
        visibility,
        place,
        bio,
        university,
        profileUrl,
        jobTitle);
    
    await connection();
    // verify the key, take the email part, request the preiouse database.
    // now according to the token search database from the previous database
    // get all creds from that database, and for the values that are null
    // instead of null insert the ones from the previous database

    let {email: previouseDBEmail} =  jwt.decode(token);
    let queryResult = await getDetailsGivenEmail(previouseDBEmail);
   
    if(!queryResult) return res.status(200).json({message: "not found"}); // if the token is inavlid

    const [ 
        {   email: previousEmail,
            username: previousUsername,
            password: previousPassword,
            public: previousPublic
        }
    ] = queryResult;

    // now making my schema
    // if new provided values are null then take the previous one
    // if not null take the values and save it to db.

    // we only need to check these values.
    username = previousUsername || username;
    password = previousPassword || password;
    visibility = visibility !== null ? visibility : previousPublic;
    

    // the data to be inserted
    
    let dataToBeInserted = new UpdateProfileSchema({
        email: previouseDBEmail,
        username,
        password,
        public: visibility,
        place,
        bio,
        profileUrl,
        title: jobTitle,
        university
    });

    // so basically data is saved to updatedProfiles collection now
    // back to front-end and actually show it


    // i have to make some changes for the password
    // they might change it they might not
    // if changed hash it then save if not changed
    // store the preious one

    try {
        let isEmailDuplicate = await findEmailDuplicates(previouseDBEmail); // based on this we update or insert into db

        if (isEmailDuplicate) {
            // if email is duplicate then update the db
            // data to be updated is different than inserting one
            let filter = { 'email': previouseDBEmail}; // based on email
            
            // another bug here. how to insert optioanlly i mean like if the bio
            // is not empty only then change the values
            // since optional params is not working we shoudl get the results from
            // this database first, compare and insert the non empty one

            // previouse values from the db
            let [{
                username : oldUsername,
                password : oldPassword,
                public:  oldPublic,
                place : oldPlace,
                bio: oldBio,
                profileUrl : oldProfileUrl,
                title: oldJobTitle,
                university: oldUniversity
            }] = await UpdateProfileSchema.find({"email": previouseDBEmail});

            // now checking the values. picking the from the query if not empty
            username = username || oldUsername;
            password = password || oldPassword;
            visibility = visibility || oldUniversity;
            place = place || oldPlace;
            bio = bio || oldBio;
            profileUrl = profileUrl || oldProfileUrl;
            jobTitle = jobTitle || oldJobTitle;
            university = university || oldUniversity;

            let updateDoc = {
                $set: {
                    username,
                    password,
                    public: visibility,
                    place,
                    bio,
                    profileUrl,
                    title: jobTitle ,
                    university
                }
                // now base on this update
                // in front-end everything should be set to optionl. remove requreid
            };
            await UpdateProfileSchema.updateOne(filter, updateDoc);
            res.status(200).json({message: "updated"});
        } else {
            // if email ain't duplicate then insert it
            await dataToBeInserted.save();
            res.status(200).json({message: "updated"});
        }
        
    } catch (error) {
        console.log(error, "*******************");
        res.status(200).json({message: "queryError"});
    }
}