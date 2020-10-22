const jwt = require('jsonwebtoken');
const roles = require('../utils/roles');

const validateToken = (request, response, next) => {
    //Middleware to validate the user's token
    const token = request.cookies.access_token;
    if(token){
        try {
            request['token'] = token;
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            request['user'] = decoded;
            if(decoded){
                next();
            }
        } catch(err) {
            console.log(err);
            response.status(401).json({message: "The token is wrong"})
        }
    }else{
        response.status(401).json({message: "The token has been delivered"})
    }
};

//permits validation
const grantAccess = (action, resource) => {
    return async (request, response, next) => {
        let permission = null;
        request.user.roles.forEach(role => {
            permission = roles().can(role.name)[action](resource);
            if(permission.granted){
                return permission;
            }
        });
        if(!permission.granted){
            return response.status(401).json({
                message: 'You do not have permissions to perform this action'
            })
        }
        next();
    }
};


module.exports = {
    validateToken,
    grantAccess
};

