const {WishListService,SaveWishListService,RemoveWishListService}=require("../services/WishListServices");


exports.Wishlist=async (req,res)=>{
    let result=await WishListService(req);
    return res.status(200).json(result)


}

exports.SaveWishListService=async (req,res)=>{
    let result=await SaveWishListService(req);
    return res.status(200).json(result)


}

exports.RemoveWishListService=async (req,res)=>{
    let result=await RemoveWishListService(req);
    return res.status(200).json(result)


}

exports.RemoveWishListService=async (req,res)=>{
    let result=await RemoveWishListService(req);
    return res.status(200).json(result)


}



