const {User}=require("../model/user")
require('dotenv').config();
let auth=(req,res,next)=>{
    let token=req.cookies.w_auth;
    User.findByToken(token, (err, user) => {
        // console.log("at auth",user)
        if(err) throw err;
        if(!user) return res.json({
            isAuth:false,
            error:true
        })
        req.token=token;
        req.user=user;
        next();
    })
}

module.exports={auth}