
const mongoose  = require("mongoose");

const DataSchema=mongoose.Schema({
    brandName:{type:String,unique:true,required:true},
    brandImg:{type:String,required:true}
},
    {timestamps:true,versionKey:false})

const BrandModel=mongoose.model('brand',DataSchema)
module.exports=BrandModel;