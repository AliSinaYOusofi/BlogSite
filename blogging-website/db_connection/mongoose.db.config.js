import { connect as _connect } from "mongoose";

async function connection() {
    let connect = _connect(process.env.MONGO_AUTH)
        .then( () => console.log("Connected"))
        .catch(error => console.log("Error: %s", String(error)));
    
    return connect;
};


export default connection;