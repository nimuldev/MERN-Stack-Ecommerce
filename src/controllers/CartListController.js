const {SaveCartListService,UpdateCartService,DeleteCartService,CartListService}=require("../services/CartListServices");

exports.CartList= async (req,res)=>{

    let result=await CartListService(req);
    return res.status(200).json(result)
}

exports.SaveCartList= async (req,res)=>{

    let result=await SaveCartListService(req);
    return res.status(200).json(result)
}

exports.UpdateCart= async (req,res)=>{

    let result=await UpdateCartService(req);
    return res.status(200).json(result)
}

exports.DeleteCart= async (req,res)=>{

    let result=await DeleteCartService(req);
    return res.status(200).json(result)
}