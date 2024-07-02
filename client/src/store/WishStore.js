import create from "zustand"
import axios from "axios";

import {unauthorized} from "../utility/utlity.js"
import CarStore from "./CarStore.js";


const WishStore = create((set)=>({
    isWishSubmit:false,
    WishSaveRequest:async(productID)=>{
        try {
            set({isWishSubmit:true})


            let res=await axios.post(`/api/v1/wishlistSave`, {productID:productID});

            return res.data['status'] === "success";
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({isWishSubmit:false})
        }
    },
    WishList:null,
    WishCount:0,
    WishListRequest:async()=>{
        try {
            let res=await axios.get(`/api/v1/wishlist`)


            set({WishList:res.data['data']})
            set({WishCount:(res.data['data']).length})



        }
        catch (e) {
            unauthorized(e.response.status)
        }
    },


    WishListRemove:async(productID)=>{
        try {
            let res=await axios.post(`/api/v1/wishlistRemove`, {productID:productID})
        }
        catch (e) {
            unauthorized(e.response.status)
        }
    }



}))

export default WishStore;