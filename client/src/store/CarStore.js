import create from "zustand"
import axios from "axios";

import {unauthorized} from "../utility/utlity.js"
import FeatureStore from "./FeatureStore.js";

const CarStore=create((set)=>({

    isCartSubmit:false,
    CartForm:{productID:"",color:"",qty:"1",size:""},
    CartFormChange:(name,value)=>{


        set((state)=>({
            CartForm:{
                ...state.CartForm,
                [name]:value
            }
        }))
    },

    // CartSaveRequest:async (postBody,productId)=>{
    //     try {
    //
    //         set({isCartSubmit:true})
    //         postBody.productID=productId
    //         console.log(postBody)
    //         let res=await axios.get('/api/v1/cartlistSave', postBody)
    //         console.log(res )
    //         return res.data['status']="success";
    //     }
    //     catch (e) {
    //         // unauthorized(e.response.status)
    //     }
    //     finally {
    //         set({isCartSubmit:false})
    //     }
    // },


    CartSaveRequest:async(PostBody,productID,qty)=>{
        try {
            set({isCartSubmit:true})
            PostBody.productID=productID
            PostBody.qty=qty
            let res=await axios.post(`/api/v1/cartlistSave`,PostBody);

            return res.data['status'] === "success";
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({isCartSubmit:false})
        }
    },


    CartList:null,
    CartCount:0,
    CartTotal:0,
    CartVatTotal:0,
    CartPayableTotal:0,
    CartListRequest:async()=>{
        try {
            let res=await axios.get(`/api/v1/cartlist`)
            console.log((res.data["data"]).length)
            set({CartList:res.data['data']})
            set({CartCount:(res.data['data']).length})
            let total=0
            let vat=0
            let payable=0
            res.data['data'].forEach((item,i)=>{
                if(item['products']['discount']===true){
                    total=total+parseInt(item['qty'])*parseInt(item['products']['discountPrice'])
                }else{
                    total=total+parseInt(item['qty'])*parseInt(item['products']['price'])
                }
            })


            vat=total*0.05
            payable=vat+total
            set({CartTotal:total})
            set({CartVatTotal:vat})
            set({CartPayableTotal:payable})


        }
        catch (e) {
            unauthorized(e.response.status)
        }
    },

    CreateInvoiceRequest:async()=>{
        try {
            set({isCartSubmit:true})
            let res=await axios.post(`/api/v1/CreateInvoice`);
            window.location.href=res.data['data']['GatewayPageURL'];
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({isCartSubmit:false})
        }
    },
    CartListRemove:async(cartID)=>{
        try {
            let res=await axios.post(`/api/v1/cartlistRemove`, {"_id":cartID})
        }
        catch (e) {
            unauthorized(e.response.status)
        }
    },
    InvoiceList:null,
    InvoiceListRequest:async()=>{
        try {
            let res=await axios.get(`/api/v1/InvoiceList`)
            set({InvoiceList:res.data['data']})

        }
        catch (e) {
            unauthorized(e.response.status)
        }
    },
    InvoiceDetails:null,
    InvoiceDetailsRequest:async(id)=>{
        try {
            let res=await axios.get(`/api/v1/InvoiceProductList/${id}`)
            set({InvoiceDetails:res.data['data']})

        }
        catch (e) {
            unauthorized(e.response.status)
        }
    }


}))

export default CarStore;