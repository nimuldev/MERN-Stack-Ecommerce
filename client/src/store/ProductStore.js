import create from 'zustand'
import axios from 'axios'

const ProductStore=create((set)=>({

    BrandList:null,
    BrandListRequest:async ()=>{
        let res=await axios.get('/api/v1/productbrand')
        if(res.data['status']==="success"){
             set({BrandList: res.data["data"]})
        }
    },

   CategoryList:null,
    CategoryListRequest:async ()=>{
        let res=await axios.get('/api/v1/productCategory')
        if(res.data['status']==="success"){
            set({CategoryList: res.data["data"]})
        }
    },
    SliderList:null,
    SliderListRequest:async ()=>{
        let res=await axios.get('/api/v1/productSliderList')
        if(res.data['status']==="success"){
            set({SliderList: res.data["data"]})
        }
    },

    ListByRemark:null,
    ListByRemarkRequest:async (remark)=>{
        let res=await axios.get(`/api/v1/productListByRemark/${remark}`)
        if(res.data['status']==="success"){
            set({ListByRemark: res.data["data"]})
        }
    },

    ListProduct:null,
    ListByBrandRequest:async (Brand)=>{
        set({ListProduct: null})
        let res=await axios.get(`/api/v1/productListByBrand/${Brand}`)
        if(res.data['status']==="success"){
            set({ListProduct: res.data["data"]})
        }
    },
    ListByCategoryRequest:async (Category)=>{
        set({ListProduct: null})
        let res=await axios.get(`/api/v1/productListByCategory/${Category}`)
        if(res.data['status']==="success"){
            set({ListProduct: res.data["data"]})
        }
    },
    ListByKeywordRequest:async (keyword)=>{
        set({ListProduct: null})
        let res=await axios.get(`/api/v1/productListByKeyword/${keyword}`)
        if(res.data['status']==="success"){
            console.log(keyword)
            set({ListProduct: res.data["data"]})
        }
    },
    ListByFilterRequest:async(postBody)=>{
        set({ListProduct:null})
        let res=await axios.post(`/api/v1/ProductListByFilter`,postBody);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },
    SearchKeyword:"",
    SetSearchKeyword:async(keyword)=>{
 set({SearchKeyword: keyword})
    },

    Details:null,
    DetailsRequest:async(id)=>{
        set({Details:null})
        let res=await axios.get(`/api/v1/ProductDetails/${id}`);
        if(res.data['status']==="success"){
            set({Details:res.data['data']})
        }
    }
    ,

    ReviewList:null,
    ReviewListRequest:async(id)=>{
        set({ReviewList:null})
        let res=await axios.get(`/api/v1/ProductReviewList/${id}`);
        if(res.data['status']==="success"){
            set({ReviewList:res.data['data']})
        }
    }


}))

export default ProductStore;