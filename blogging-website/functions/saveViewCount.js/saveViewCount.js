import connection from "../../db_connection/mongoose.db.config"
import viewSchema from '../../db_models/WebsiteView';

export const saveViewCounter = async (country) => {
    await connection();
    try {
        const saveCount = viewSchema.insertMany({country})
    } catch (error) { console.log(error)}
}