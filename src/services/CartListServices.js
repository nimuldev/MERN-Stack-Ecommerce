const mongoose=require("mongoose")
const CartModel=require("../models/CartModel")
const WishModel = require("../models/WishModel");
const ObjectId=mongoose.Types.ObjectId;

const SaveCartListService = async (req) =>{
    try{
        let user_id=new ObjectId(req.headers.user_id);
        let reqBody=req.body
        reqBody.userID=user_id;
        await  CartModel.create(reqBody)
        return {status:"success",Message:"CartList Save"}
    }
    catch (e) {
        return {status:"Fail",Message:e}
    }

}

const CartListService = async (req) =>{
    try {
        let user_id=new ObjectId(req.headers.user_id);
        let matchStage={$match:{userID:user_id}}

        let joinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"products"}}
        let unwindProductStage={$unwind:"$products"}

        let joinStageBrand={$lookup:{from:"brands",localField:"products.brandID",foreignField:"_id",as:"brands"}}
        let unwindBrandStage={$unwind:"$brands"}

        let joinStageCategory={$lookup:{from:"categories",localField:"products.categoryID",foreignField:"_id",as:"category"}}
        let unwindCategoryStage={$unwind:"$category"}



        let projectionStage={
            $project:{
                '_id':0,'userID':0,'createdAt':0,'updatedAt':0,'products._id':0,
                'products.categoryID':0,'products.brandID':0,'brands._id':0,'category._id':0

            }
        }

        let data=await CartModel.aggregate([
            matchStage,
            joinStageProduct,
            unwindProductStage,
            joinStageBrand,
            unwindBrandStage,
            joinStageCategory,
            unwindCategoryStage,
            projectionStage
        ])

        return {status:"success",data:data}


    }

    catch (e) {
        return {status:"fail"}
    }
}

const UpdateCartService = async (req) =>{

   try{
        let user_id= req.headers.user_id ;
        let cartId=req.params.cartID
       let reqBody=req.body;
       await  CartModel.updateOne({_id:cartId,userID:user_id},{$set:reqBody})

       return {status:"success",Message:"CartList Update"}
    }
    catch (e) {
        return {status:"Fail",Message:e}
    }

}

const DeleteCartService = async (req) =>{
    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body
        reqBody.userID=user_id;
        await  CartModel.deleteOne(reqBody)
        return {status:"success",Message:"CartList Delete"}
    }
    catch (e) {
        return {status:"Fail",Message:e}
    }
}

module.exports = {
    SaveCartListService,UpdateCartService,DeleteCartService,CartListService
}
