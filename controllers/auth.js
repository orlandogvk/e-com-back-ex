const sequelize = require('sequelize');
const Op = sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../middlewares/nodemailer');
const {Users} = require('../models');

const login = async (request, response) => {
    const { email, password } = request.body;
    let user = await Users.findOne({
        where: {
            email: email
        }
    });
    //If user exists
    if (user) {
        //Compare the passwords
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
        // Cuando no exista el correo enviado a través de la petición en nuestra base de datos
        //When don't exists the the email sending through the request in our db.
        response
            .status(401)
            .json({ message: "The credentials are wrong" });
    }
};

const resetPassword = async(req, res) => {
    //Get the email through the req
    let email = req.body.email;
    try {
        //Get the user's row
        const users = await Users.findOne({
            where: {
                email: email
            }
        });
        //I send the email to user
        await sendEmail(email, users.id, users.token);
        res.json({message: "The email has sent"});
    } catch (error) {
        res
            .status(400)
            .json({message: "The email hasn't sent", error: error});
    }
};

const logout = (req, res) => {
    res
        .clearCookie('access_token', {path: '/'})
        .json({message: "Closing session..."});
};

const generateToken = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const updatePassword = async(req, res) => {
    const {id, token, password} = req.body;
    const user = await Users.findOne({
        where: {
            [Op.and]: [
                {
                    id: id
                }, {
                    token: token
                }
            ]
        }
    });

    if (user) {
        const passwordEncrypted = bcrypt.hashSync(password, 10);
        try {
            const updatedUser = await Users.update({
                password: passwordEncrypted,
                token: generateToken(8),
                updated_at: new Date()
            }, {
                returning: true,
                where: {
                    id: id
                }
            });
            res.json({message: "The password has updated succesfully",user:updatedUser})
        } catch (error) {
            res
                .status(400)
                .json({message: "The password don't recovered"})
        }

    } else {
        res
            .status(400)
            .json({message: "The password don't recovered"})
    }
};


/* const resetPassword = async (req, res) => {

    try {

        const { email } = req.body;
        const user = await Users.findOne({
            where: {
                email: email
            }
        })
        console.log('USER',user.dataValues)

        //Check if the user exists
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
            await sendEmail(mailOptions);
            res.json({ data: user.email, message: "The email has sent" });
        } else {
           
              //When don't exists the the email sending through the request in our db.
        response
            res.status(401).json({ message: "Email not in db" });
        }

    } catch (err) {
        res.status(401).json({
            message: "The email hasn't sent",
            error: err.message
        })
        console.log(err);
    }



};
 */

/* const updatePassword=async(req,res)=>{
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
};
 */





