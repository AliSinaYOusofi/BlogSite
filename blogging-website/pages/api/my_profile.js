export default async function handler(req, res) {

    if (req.method !== "GET") return res.status(200).json({message: "only get reqs"});
    
    res.status(200).json({message: "update me profile"});
}