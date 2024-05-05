const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const auth = async(req, res, next) => {
    try{
        const token = req.header('Authorization').split(' ')[1]
        console.log("Token: "+token)
        const decoded = jwt.decode(token, "kdweueksdsjfij")
        console.log("Decoded: "+decoded)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
        console.log("User: "+user)
        if(!user){
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    }catch(error){
        res.status(403).send("Forbidden Access");
    }
}

module.exports = auth;