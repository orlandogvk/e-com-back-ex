const express = require('express');
const app = express();
const morgan = require('morgan');
const { Users, Roles } = require('./models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateToken = require('./middlewares/auth');
const enviarCorreo = require('./middlewares/nodemailer');
require('dotenv').config();


//Middleware
app.use(express.json());
app.use(morgan('dev'));

app.post('/api/v1/users/login', async (request, response) => {
    const { email, password } = request.body;
    let user = await Users.findOne({
        where: {
            email: email
        }
    });
    //Comprobar que el usuario exista
    if (user) {
        //Comparar las contraseñas
        bcrypt
            .compare(password, user.password, function (err, res) {
                if (err || res === false) {
                    response
                        .status(401)
                        .json({ message: "The credentials are wrong" });
                } else {
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name
                    }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    response.cookie('access_token', 'Bearer ' + token, {
                        expires: new Date(Date.now() + 1 * 3600000) // cookie will be removed after 1 hour
                    })
                    Users.update({token:token},{ where: {id:user.id}})
                    response.json({ message: "You're login OK", token: token });
                }
            });
    } else {
        // Cuando no exista el correo enviado a través de la petición en nuestra base de
        // datos
        response
            .status(401)
            .json({ message: "The credentials are wrong" });
    }
});


app.post('/api/v1/users/reset-password', async (req, res) => {

    try {

        const { email } = req.body;
        const user = await Users.findOne({
            where: {
                email: email
            }
        })
        console.log('USER',user.dataValues)
        //Comprobar si el usuario existe
        if (user) {
            console.log('TOKEN USER',user.token)
            const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        token:user.token
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('access_token', 'Bearer ' + token, {
                expires: new Date(Date.now() + 1 * 3600000) // cookie will be removed after 1 hour
            })

            const mailOptions = {
                from: process.env.GOOGLE_ACCOUNT,
                to: email,
                subject: "Password Reset e-commerce",
                html: `<p>Click this link to reset your password <a href=${process.env.CLIENT_URL}/?user=${user.id}&token=${token}>${process.env.CLIENT_URL}/?user=${user.id}&token=${token}</a></p>`
            }
            await enviarCorreo(mailOptions);
            res.json({ data: user.email, message: "The email has sent" });
        } else {
            // Cuando no exista el correo enviado a través de la petición en nuestra base de
            // datos
            res.status(401).json({ message: "Email not in db" });
        }

    } catch (err) {
        res.status(401).json({
            message: "The email hasn't sent",
            error: err.message
        })
        console.log(err);
    }



});


/*El middleware de /api/v1/users/update-password será la 
continuación del punto no.6 en este middleware se comprobará que el id del usuario
 y token enviados correspondan al registro que tenemos en nuestra base de datos, 
 si coincide entonces podremos acceder a actualizar la contraseña, 
 de lo contrario responderemos con un mensaje de error, 
 si el token corresponde al usuario con el id entonces actualizaremos el valor del token
para invalidar el token y ya no se use nuevamente.*/ 

app.post('/api/v1/users/update-password/:id/:token',async(req,res)=>{
    try{
        const {id,token}=req.params;
        const{password}=req.body;
        const user = await Users.findOne({
            where: {
                id: id
            }
        })
      
        try{
            const secret=user.password + "-"+ user.created_at
            const payload=jwt.decode(token,secret)
           // console.log('TOKEN',payload)
          
            if(payload.id===user.id || payload.token===user.token){

                //Encriptando la contraseña con bcryptjs
               const passwordEncrypted = bcrypt.hashSync(password, 10);
               Users.update({password:passwordEncrypted},{ where: {id:id}})
             
            //We realize the decode TOKEN that is a property of main TOKEN
               const secTok=user.token+"-"+user.created_at
               const subPayload=jwt.decode(payload.token,secTok)
    
           /*  
               console.log('SUBTOKEN',subPayload);
               console.log('Token_id',payload.id)
               console.log('Id_subtoken',subPayload.id)  */

            //Let's compare if id user that belongs to Main TOKEN is the same that the id subtoken
               if(subPayload.id===payload.id){
                   //Then we create a new token to replace the last the current token
                const Newtoken = jwt.sign({
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name
                }, process.env.JWT_SECRET, { expiresIn: '10h' });
                console.log('NEW TOKEN',Newtoken);
                await Users.update({token:Newtoken},{ where: {id:user.id}})
                res.cookie('access_token', 'Bearer ' + Newtoken, {
                    expires: new Date(Date.now() + 10 * 3600000) 
                })
                
                res.json({message: "Password changed accepted" })  
                console.log("Token has changed")

                }else{
                        res.status(401).json({ message: "Token don't belongs" });
                }  


           }else{
               res.status(401).json({ message: "User unknown" });
           }
         

            
        }catch(err){
            res.status(500).json({
                error: err.message
            })  
        } 
      
    }catch(err){
         res.status(401).json({
            message: "Invalid user",
            error: err.message
        })
    }
});

app.use(validateToken);

app.get('/', (request, response) => {
    response.send("Hello world");
});

app.get('/api/v1/users', async (request, response) => {
    const users = await Users.findAll();
    response.json({ results: users })
});

app.get('/api/v1/users/:id', async (request, response) => {
    const userId = request.params.id;
    const users = await Users.findOne({
        where: {
            id: userId
        }
    });
    response.json(users)
});

app.post('/api/v1/users', async (request, response) => {

    let {
        email,
        first_name,
        last_name,
        active,
        password,
        token
    } = request.body;

    //Encriptando la contraseña con bcryptjs
    const passwordEncrypted = bcrypt.hashSync(password, 10);

    const user = await Users.create({
        email,
        first_name,
        last_name,
        password: passwordEncrypted,
        created_at: new Date(),
        updated_at: new Date()
    })
    await Users.update({active:true,token:" "},{ where: {id:user.id}})
    response.json({ message: "It has added the user successfully", user })
});


app.put('/api/v1/users/:id', async (request, response) => {
    let userId = request.params.id;
 
    let {
        email,
        first_name,
        last_name,
        active,
        password,
        token,
    } = request.body;
    try {
        const users = await Users.update({
            email,
            first_name,
            last_name,
            active,
            password,
            token,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: userId
            }
        }); 
        const user = users[1][0].dataValues;
        response.json(user);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
});
//Logic delete
app.delete('/api/v1/users/:id', async (request, response) => {
    let userId = request.params.id;
    let decoded = jwt.verify(request.token, process.env.JWT_SECRET);
    try{
        let user = await Users.findOne({
            where: {
                id: userId
            }
        });
        if(decoded.id !== Number(userId) && user){
            await Users.update({active: false}, {
                where: {
                    id: userId
                }
            });
            response.json({message: "The account has been inactive"});
        }else{
            response.status(400).json({message: "There's an error to try to disable the acount"});
        }
    }catch(error){
        response.status(400).json({message: "There's an error to try to disable the acount"});
    }

});





app.listen(8000, () => {
    console.log("Server starting at port 8000");
});
