const nodemailer = require("nodemailer");
require('dotenv').config();



const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{ 
        user: process.env.GOOGLE_ACCOUNT,
        pass: process.env.GOOGLE_SECRET_APP,
    }
   
});

const setMailOptions = (email, userId, token) => {
    return {
        from: process.env.GOOGLE_ACCOUNT,
        to: email,
        subject: 'E-commerce app recovery password',
        html: `<h1>Please click on this link</h1> <a href="http://localhost:3000/actualizar-contrasena?user=${userId}&token=${token}">Da click aquí para restablecer tu contraseña</a>`
    }
};

const sendEmail=(email, userId, token)=>{

    return new Promise((resolve, reject)=>{
        transporter.sendMail(setMailOptions(email, userId, token),(error,info)=>{
            if(error){
                reject(error.message);
            }else{
                resolve(info.response);
            }
        });

    })
};

module.exports=sendEmail; 

