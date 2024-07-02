const mongoose  = require("mongoose");

const DataSchema=mongoose.Schema({
        email:{type:String,unique:true,required:true,lowercase:true},
        otp:{type:String,required:true}
    },
    {timestamps:true,versionKey:false})

const UserModel=mongoose.model('user',DataSchema)
module.exports=UserModel;