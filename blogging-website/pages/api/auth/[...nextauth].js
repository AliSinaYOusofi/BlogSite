/*
    wanted to use Next-Auth but i will use jwt
*/


import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import connection from '../../db_connection/mongoose.db.config';
import RegisterationSchema from '../../db_models/RegisterationSchema';

import bcrypt from 'bcrypt';
     

function comparePasswordHash(password, hash) { return bcrypt.compareSync(password, hash);}


async function findEmailDuplicates(field) {
    // checking if email already exists
    let exists;
    try {
        exists = await RegisterationSchema.exists({email: field});
    } catch (error) { console.log(error, "error on findEmailDups function()")}
    console.log(exists, "fucking exists or not");
    return await exists;
}


export default NextAuth( {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials, req) { // authorize callback will be fired when user is authorixed
                // first checking our db connection
                
                let isValidUser;

                const {email, password} = credentials; // not from the body but from creds

                let emailExists = await findEmailDuplicates(email);
                
                if (emailExists) {
                    // email is valid. check the password
                    const user = await RegisterationSchema.find({'email': email});
                    
                    // destructing
                    const [ {email: dbEmail, password: dbPassword}] = user; // nicely
                    isValidUser = (password, comparePasswordHash(password, dbPassword));

                    if (isValidUser) {
                        
                    } else {
                        throw new Error("invalid password or email");  
                    }
                    
                } else { 
                    throw new Error("invalid email password or email");
                    isValidUser = false;
                }
                return 'saved';
            }
        })
    ]
})