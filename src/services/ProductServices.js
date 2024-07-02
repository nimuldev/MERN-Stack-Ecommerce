const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductSlidersModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const ReviewModel = require("../models/ReviewModel");
const mongoose =require('mongoose');
const ObjectId=mongoose.Types.ObjectId;

const BrandListServcie= async ()=>{
    try {
        let data=await BrandModel.find()

        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const ProductCategoryListServcie= async ()=>{
    try {
        let data=await CategoryModel.find()
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const SliderListServces =async ()=>{
    try {
        let data=await ProductSlidersModel.find()
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const productListByServces =async (req)=>{
    try {
        let BrandID=new ObjectId(req.params.BrandID);
        let MatchStage={$match:{brandID:BrandID}}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};

        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        // Query

        let data= await  ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage

        ])


        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const categoryListByServces =async (req)=>{
    try {

        let CategoryID=new ObjectId(req.params.CategoryID);
        let MatchStage={$match:{categoryID:CategoryID}}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  ProductModel.aggregate([
            MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const SimilarListByServces = async (req) => {

    try {
        let CategoryID=new ObjectId(req.params.CategoryID);
        let MatchStage={$match:{categoryID:CategoryID}}
        let limitStage={$limit:20}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  ProductModel.aggregate([
            MatchStage, limitStage,JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        return {status:"success",data:data}

    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }

}



const productListBykeyword = async (req) => {

    try{
        let SearchRegex={"$regex":req.params.Keyword, "$options":"i"}
        let SearchParams=[{title:SearchRegex},{shortDes:SearchRegex}]
        let SearchQuery={$or:SearchParams}

        let MatchStage={$match:SearchQuery}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  ProductModel.aggregate([
            MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }

}

const productListByRemark = async (req) => {

    try {

        let Remark=req.params.Remark;
        let MatchStage={$match:{remark:Remark}}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  ProductModel.aggregate([
            MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])


        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}

const ProductDetails = async (req) => {

    try {
        let ProductID=new ObjectId(req.params.ProductID);
        let MatchStage={$match:{_id:ProductID}}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let JoinWithDetailsStage={$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"details"}};

        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let UnwindDetailsStage={$unwind:"$details"}


        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data=await  ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            UnwindDetailsStage,
            ProjectionStage,
        ])
        return {status:"success",data:data}

    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }


}


const ProductByFilter = async (req) => {

try {


    let matchConditions = {};
    if (req.body['categoryID']) {
        matchConditions.categoryID = new ObjectId(req.body['categoryID']);
    }

    if (req.body['brandID']) {
        matchConditions.brandID = new ObjectId(req.body['brandID']);
    }

    let matchStage={$match: matchConditions};


    let AddFeildsSatge={
        $addFields:{numericPrice: {$toInt: "$price"}}
    };

    let priceMax=parseInt(req.body["priceMax"])
    let priceMin=parseInt(req.body["priceMin"])
    let priceMatchCondition={}

    if(!isNaN(priceMin)){
        priceMatchCondition['numericPrice']={$gte: priceMin};
    }
    if(!isNaN(priceMax)){
        priceMatchCondition['numericPrice']={...(priceMatchCondition['numericPrice'] || {}), $lte: priceMax}
    }
    let PriceMatchStage={$match :priceMatchCondition }



    let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
    let ProjectStage={$project:{'brand._id':0,'category._id':0,'brandID':0,'categoryID':0}}

    let data =await ProductModel.aggregate([
        matchStage,
        AddFeildsSatge,
        PriceMatchStage,
        JoinWithBrandStage,JoinWithCategoryStage,
        UnwindBrandStage,UnwindCategoryStage, ProjectStage
    ])



    return {status:"success",data:data}

}
catch (e) {
    return {status:"fail",data:e}.toString()
}


}

const ReviewListService = async (req) => {

    try {

        let ProductID=new ObjectId(req.params.ProductID);
        let MatchStage={$match:{productID:ProductID}}

        let JoinWithProfileStage= {$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}};
        let UnwindProfileStage={$unwind:"$profile"}
        let ProjectionStage= {$project: {'des': 1, 'rating': 1, 'profile.cus_name': 1}}

        let data= await  ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfileStage,
            ProjectionStage
        ])

        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}



const CreateReviewService = async (req) => {
    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        let data=await ReviewModel.create({
            productID:reqBody['productID'],
            userID:user_id,
            des:reqBody['des'],
            rating:reqBody['rating'],
        })
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e.toString()}
    }
}

module.exports = {
    CreateReviewService, BrandListServcie,ReviewListService,ProductByFilter,ProductCategoryListServcie,ProductDetails,productListBykeyword,productListByRemark ,SliderListServces,productListByServces,categoryListByServces,SimilarListByServces
}
