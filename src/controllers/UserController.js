
const {UserOTPService,UserOTPVerify,UserProfile,ReadProfile}=require("../services/UserServices");

exports.UserOTPService=async (req,res)=>{

    let result = await UserOTPService(req)

    return res.status(200).json(result);
}

exports.UserOTPVerify=async (req,res)=>{

    let result = await UserOTPVerify(req)

    if(result["status"]==="success"){
let cookieOption={expires:new Date(Date.now()+24*6000*1000),httpOnly:false}

        res.cookie('token',result['token'],cookieOption)
        return res.status(200).json(result);
    }
    else {
        return res.status(200).json(result);
    }


}



exports.UserLogOut=async (req,res)=>{

    let cookieOption={expires:new Date(Date.now()-24*6000*1000),httpOnly:false}

    res.cookie('token',"",cookieOption)

    return res.status(200).json({status:"success", message:"User Logout"});
}


exports.UserProfile=async (req,res)=>{

    let result= await UserProfile(req)
    return res.status(200).json(result)
}

exports.ReadProfile=async (req,res)=>{

    let result= await ReadProfile(req)
    return res.status(200).json(result)
}