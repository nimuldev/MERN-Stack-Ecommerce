const mongoose=require("mongoose")
const WishModel=require("../models/WishModel")
const ObjectId=mongoose.Types.ObjectId;


const WishListService = async (req) =>{


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

        let data=await WishModel.aggregate([
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


const SaveWishListService=async (req)=>{

    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body
        reqBody.userID=user_id;
      await  WishModel.updateOne(reqBody,{$set:reqBody},{upsert:true})
        return {status:"success",Message:"WishList Save"}
    }
    catch (e) {
        return {status:"Fail",Message:e}
    }

}

const RemoveWishListService=async (req)=>{

    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body
        reqBody.userID=user_id;
        await  WishModel.deleteOne(reqBody)
        return {status:"success",Message:"WishList Removed"}
    }
    catch (e) {
        return {status:"Fail",Message:e}
    }

}

module.exports = {
    WishListService,SaveWishListService,RemoveWishListService
}