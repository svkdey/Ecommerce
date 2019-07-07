const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const productSchema=mongoose.Schema({
    name:{
        required:true,
        type:String,
        unique:1,
        maxlength:100
    },
    descrption:{
        required: true,
        type: String,
        maxlength:10000,
    },price:{
        required: true,
        type: Number,
    },brand:{
        //adding foreign id
        type:Schema.Types.ObjectId,
        ref:'Brand',
        required:true
    },
    shipping:{
        required:true,
        type:Boolean
    },
    available:{
         required: true,
             type: Boolean
    },
    wood:{
         //adding foreign id
        type:Schema.Types.ObjectId,
        ref:'Wood',
        required:true
    },
    frets:{
         required: true,
        type: Number
    },
    solid:{
        type:Number,
        maxlength:100,
        default:0
    },
    publish:{
        required:true,
        type:Boolean
    },
    images:{
        types:Array,
        default:[]
    }
},{timestamps:true})

const Product=mongoose.model('Product',productSchema);

module.exports={Product}