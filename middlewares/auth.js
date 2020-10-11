const jwt = require('jsonwebtoken');


const validateToken = (request, response, next) => {
    //Middleware para validar el token del usuario
    // token = request.headers
    
    const bearerHeader=request.headers['authorization']
    console.log('AUTORIZACION',bearerHeader)
    if(typeof bearerHeader !== "undefined"){
        const authorization = bearerHeader.split(' ');
        const token = authorization[1];
        
        try {
            request['token'] = token;
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('PAYLOAD ',decoded);
            if(decoded){
                next();
            }
        } catch(err) {
            console.log(err);
            response.status(401).json({message: "The token is wrong"})
        }

    }else{
        response.status(401).json({message: "The token hasn't been delivered"})
    }
    
}

module.exports = validateToken;
