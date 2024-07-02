const EmailSend=require("../utility/EmailHelper")
const UserModel=require("../models/UserModel")
const UserProfileModel=require("../models/ProfileModel")
const {EncodeToken}=require("../utility/TokenHelper")

const UserOTPService=async (req)=>{

    try{
        let email=req.params.email;
        let code=Math.floor(100000+Math.random()*900000)

        let EmailText=`Your verification Code is: ${code}`
        let EmailSubject="Emil verification"



        await EmailSend(email,EmailText,EmailSubject)
        await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})

        return {status:"Success",message:"6 Digit OTP sent"}


    }
    catch (e) {
        return {status:"Fail",message:e}
    }

}

const UserOTPVerify=async (req)=>{

    try {000
        let email=req.params.email;
        let OTP=req.params.otp;



        let total=await UserModel.find({email:email,otp:OTP}).count('total')


        if(total===1){
            let user_id=await UserModel.find({email:email,otp:OTP}).select('_id')
            console.log(OTP,email,user_id)
            let token=EncodeToken(email,user_id[0]['_id'].toString())

            await UserModel.updateOne({email:email},{$set:{otp:"0"}})
            return {status:"success", message:"Valid OTP",token:token}
        }

        else {
            return {status:"Fail",message:'Invalid OTP111'}
        }
    }

    catch (e) {
        return {status:"Fail",message:e}
    }


}


  const UserProfile = async (req) => {

      let user_Id=req.headers.user_id;

      let reqBody=req.body;
      reqBody.userID=user_Id;
      console.log("ser"+user_Id);
await UserProfileModel.updateOne({userID:user_Id},{$set:reqBody},{upsert:true})
      return {status:"success", message:"Profile Successfully Created"}
  }


const ReadProfile = async (req) => {

    let user_Id=req.headers.user_id;

    let result=  await UserProfileModel.find({userID:user_Id})
    return {status:"success", message:"Profile Read Successfully",data:result}
}


module.exports={UserOTPService,UserOTPVerify,UserProfile,ReadProfile}