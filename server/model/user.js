const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const SALT=9;
const jwt=require("jsonwebtoken")
require('dotenv').config();
const userSchema=mongoose.Schema({
    email:
        {
            type:String,
            required:true,
            trim:true,
            unique:true
        },
    password:
        {
            type:String,
            required:true,
            trim:true,
            unique:true,
            minlength:5
    },
    name:{
        type:String,
            required:true,
            trim:true,
    },
    lastname:{
         type: String,
             required: true,
             trim: true,
    },
    cart:{
        type:Array,
        default:[]
    },
    history:{
         type: Array,
        default: []
    },
    role:{
        type:Number,
        defaul:0
    },
    token:{
        type:String
    }

});
userSchema.pre("save",function(next){
    var user=this;
    if(user.isModified("password")){
         bcrypt.genSalt(SALT, function (err, salt) {
             if (err) return nxt(err)
             bcrypt.hash(user.password, salt, function (err, hash) {
                 if (err) return nxt(err);
                 user.password = hash;
                 next();
             })
         })
        
    } 
    else {
        next()
    }
   
    
})
userSchema.methods.comparePassword=function(candidatePW,cb){
    
    bcrypt.compare(candidatePW,this.password,(err,isMatch)=>{
        if(err) return cb(err);
        cb(null,isMatch)
    })

}

userSchema.methods.generateToken=function(cb){
    var user=this;

    var token=jwt.sign(user._id.toHexString(),process.env.SECRET)
    user.token=token;
    user.save((err,user)=>{
        if(err) return cb(err);
        cb(null,user)
    })
}
userSchema.statics.findByToken=function(token,cb){
    var user=this;
    jwt.verify(token, process.env.SECRET,(err,decode)=>{
        user.findOne({'_id':decode,'token':token},(err,user)=>{
            if(err) return cb(err);
            else cb(null,user)
        })
    })
}
const User=mongoose.model("User",userSchema);
module.exports={User}