const express=require("express")
const router=require("./src/routers/api")
const app=new express()
const rateLimiter =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');

const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const mongoose =require('mongoose');
const path = require("path");




app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(express.json({limit:"50mb"}));

let limiter=rateLimiter({windowMs:15*60*100,max:3000})
app.use(limiter);

let URI="mongodb+srv://nimul:nahid123@cluster0.631m7xq.mongodb.net/ecommerceproject1";
let OPTION={user:'nimul',pass:'nahid123',autoIndex:true}



mongoose.connect(URI,OPTION).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

app.set('etag', false);
app.use("/api/v1",router)
app.use(express.static('client/dist'));

app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})

module.exports=app;

