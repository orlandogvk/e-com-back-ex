const jwt = require('jsonwebtoken');


const validateToken = (request, response, next) => {
    //Middleware to validate the user's token
    const token = request.cookies.access_token;
    if(token){
        try {
            request['token'] = token;
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            request['decoded'] = decoded;
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
}



module.exports = validateToken;
