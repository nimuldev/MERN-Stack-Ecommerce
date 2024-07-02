const {BrandListServcie,CreateReviewService,ReviewListService,ProductByFilter,ProductCategoryListServcie,SliderListServces,ProductDetails,productListBykeyword,productListByServces,productListByRemark, categoryListByServces,SimilarListByServces}=require("../services/ProductServices")


exports.ProductBrandList=async (req,res)=>{
     let result=await BrandListServcie();

     res.status(200).json(result)
}

exports.ProductCategoryList=async (req,res)=>{
    let result=await ProductCategoryListServcie();
    return res.status(200).json(result)
}

exports.ProductSliderList=async (req,res)=>{
    let result=await SliderListServces();
    return res.status(200).json(result)
}

exports.productListByBrand=async (req,res)=>{
    let result=await productListByServces(req);
    return res.status(200).json(result)
}

exports.productListByCategory=async (req,res)=>{
    let result=await categoryListByServces(req);
    return res.status(200).json(result)
}

exports.productListBySimilar=async (req,res)=>{
    let result=await SimilarListByServces(req);
    return res.status(200).json(result)
}

exports.productListByKeyword=async (req,res)=>{
    let result=await productListBykeyword(req);
    return res.status(200).json(result)
}


exports.productListByRemark=async (req,res)=>{
    let result=await productListByRemark(req);
    return res.status(200).json(result)
}

exports.ProductDetails=async (req,res)=>{
    let result=await ProductDetails(req);
    return res.status(200).json(result)
}

exports.ProductListByFilter=async (req,res)=>{
    let result=await ProductByFilter(req);

    return res.status(200).json(result)
}


exports.CreateReview=async(req,res)=>{
    let result=await CreateReviewService(req);
    return res.status(200).json(result)
}


exports.ProductReviewList=async (req,res)=>{
    let result=await ReviewListService(req);

    return res.status(200).json(result)
}