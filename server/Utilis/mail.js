const mailer = require("nodemailer");
require('dotenv').config();
const { resetPass}=require("./ResetPassTemplate")
const {welcome}=require("./welcome");
const {purchase}=require("./purchase")
const getEmaildata=(to, name, token, type,actionData=null)=>{
let data=null;
switch(type){
    case "welcome":
        data={
            from: "waves.guiters.rev@gmail.com",
            to:to,
            subject:`Welcome To Waves ${name}`,
            text:"Testing Our waves mails",
            html:welcome(),
        }
        
        break;
    case "purchase":
        data = {
            from: "waves.guiters.rev@gmail.com",
            to: to,
            subject: `Thanks for shopping with us${name}`,
            text: "Testing Our waves mails",
            html: purchase(actionData),
        }
        // console.log(data)
        break;
    case "reset_password":
        data = {
            from: "waves.guiters.rev@gmail.com",
            to: to,
            subject: `Hey ${name},Rest Your Password`,
            text: "Testing Our waves mails",
            html: resetPass(actionData),
        }
        // console.log(data)
        break;
    default:
        data;
    }
    console.log(data)
    return data
}
const sendEmail=(to,name,token,type,actionData=null)=>{
    const smtpTransport=mailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        Service:"Gmail",
        auth:{
            user:"waves.guiters.rev@gmail.com",
            pass:process.env.PASSWORD
        }
    });

    const mail = getEmaildata(to, name, token, type, actionData)
    // smtpTransport.sendMail(mail,(err,res)=>{
    //     if(err) console.log(err);
    //     else console.log("email sent")
    //     smtpTransport.close()
    // })



}

module.exports={sendEmail}