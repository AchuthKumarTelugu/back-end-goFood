const mongoose=require('mongoose')
const {Schema} = mongoose //destructing schema
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now //defaulting giving date
    }
})
module.exports=mongoose.model('users',userSchema) //to export and use schema