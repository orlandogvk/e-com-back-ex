const nodemailer = require("nodemailer");
require('dotenv').config();



const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{ 
        user: process.env.GOOGLE_ACCOUNT,
        pass: process.env.GOOGLE_SECRET_APP,
    }
   
});

 /*  const mailOptions = {
    from:'',
    to:'',
    subject:'',
    text:'',
    html:''
} */
  

const enviarCorreo=(obj)=>{

    return new Promise((resolve, reject)=>{
        transporter.sendMail(obj,(error,info)=>{
            if(error){
                reject(error.message);
            }else{
                resolve(info.response);
            }
        });

    })
}

module.exports=enviarCorreo; 