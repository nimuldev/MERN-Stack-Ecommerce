const axion =require("axios")
const InvoiceProductModel=require("../models/InvocieProductModel")
const PaymentSettingModel=require("../models/PaymentSettingModel")
const InvoiceModel=require("../models/InvoiceModel")
const CartModel=require("../models/CartModel")
const ProfileModel=require("../models/ProfileModel")
const mongoose = require("mongoose");
const ObjectId=mongoose.Types.ObjectId;
const FormData=require("form-data")

const CreateInvoiceService=async (req)=>{

    try {
        let user_id=new ObjectId(req.headers.user_id);
        let cus_email=req.headers.email;

// =============Step 01: Calculate Total Payable & Vat=====================================================================================

        let MatchState={$match:{userID:user_id}}
        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"Product"}}
        let unWindStage={$unwind:"$Product"}

   //   let CartProduct=await CartModel.aggregate([MatchState])
      let CartProduct=await CartModel.aggregate([
          MatchState,
          JoinStageProduct,
          unWindStage
      ])


        let totalAmount=0;

        CartProduct.forEach((element)=>{
            let price;
            if (element["Product"]["discount"]) {
                price = parseFloat(element["Product"]["discountPrice"])
            } else {
                price = parseFloat(element["Product"]["price"])

            }
            totalAmount+=price*parseInt(element["qty"])

        })
        let vat=totalAmount*0.05
 let payable=totalAmount+vat;





        // =============Step 02: Prepare  Customer Details & Shipping Details=====================================================================================

  let Profile=await ProfileModel.aggregate([MatchState])
        let cus_details=`Name:${Profile[0]['cus_name']},Address:${Profile[0]['cus_add']},Phone:${Profile[0]['cus_phone']},City:${Profile[0]['cus_city']},PostCode:${Profile[0]['cus_postcode']}`
        let ship_details=`Name:${Profile[0]['ship_name']},Address:${Profile[0]['ship_add']},Phone:${Profile[0]['ship_phone']},City:${Profile[0]['ship_city']},PostCode:${Profile[0]['ship_postcode']}`




// =============Step 03: Transaction & Other's ID=====================================================================================

        let tran_id=Math.floor(10000000+Math.random()*90000000);
  let val_id=0;
  let delivery_status="Pending"
  let payment_status="Pending"


        // =============Step 04: Create Invoice=====================================================================================

        let createInvoice=await InvoiceModel.create({
            userID:user_id,
            payable:payable,
            cus_details:cus_details,
            ship_address:ship_details,
            tran_id:tran_id,
            val_id:val_id,
            payment_status:payment_status,
            delivery_status:delivery_status,
            total:totalAmount,
            vat:vat
        })

// =============Step 05: Create Invoice Product=====================================================================================

let invoice_id=createInvoice["_id"];
        CartProduct.forEach(async (element)=>{
            await InvoiceProductModel.create({
                userID:user_id,
                productID:element['productID'],
                invoiceID:invoice_id,
                qty:element['qty'],
                price:element['Product']['discount']?element['Product']['discountPrice']:element['Product']['price'],
                color:element['color'],
                size:element['size']
            });
        });

        //=============Step 06: Remove Carts=====================================================================================

        await CartModel.deleteMany({userID:user_id})


        //=============Step 07: Prepare SSL Payment====================================================================================

        let PaymentSettings=await PaymentSettingModel.find();


   const form=new FormData();
        form.append('store_id',PaymentSettings[0]['store_id'])
        form.append('store_passwd',PaymentSettings[0]['store_passwd'])
        form.append('total_amount',payable.toString())
        form.append('currency',PaymentSettings[0]['currency'])
        form.append('tran_id',tran_id)

        form.append('success_url',`${PaymentSettings[0]['success_url']}/${tran_id}`)
        form.append('fail_url',`${PaymentSettings[0]['fail_url']}/${tran_id}`)
        form.append('cancel_url',`${PaymentSettings[0]['cancel_url']}/${tran_id}`)
        form.append('ipn_url',`${PaymentSettings[0]['ipn_url']}/${tran_id}`)

        form.append('cus_name',Profile[0]['cus_name'])
        form.append('cus_email',cus_email)
        form.append('cus_add1',Profile[0]['cus_add'])
        form.append('cus_add2',Profile[0]['cus_add'])
        form.append('cus_city',Profile[0]['cus_city'])
        form.append('cus_state',Profile[0]['cus_state'])
        form.append('cus_postcode',Profile[0]['cus_postcode'])
        form.append('cus_country',Profile[0]['cus_country'])
        form.append('cus_phone',Profile[0]['cus_phone'])
        form.append('cus_fax',Profile[0]['cus_phone'])

        form.append('shipping_method',"YES")
        form.append('ship_name',Profile[0]['ship_name'])
        form.append('ship_add1',Profile[0]['ship_add'])
        form.append('ship_add2',Profile[0]['ship_add'])
        form.append('ship_city',Profile[0]['ship_city'])
        form.append('ship_state',Profile[0]['ship_state'])
        form.append('ship_country',Profile[0]['ship_country'])
        form.append('ship_postcode',Profile[0]['ship_postcode'])

        form.append('product_name','According Invoice')
        form.append('product_category','According Invoice')
        form.append('product_profile','According Invoice')
        form.append('product_amount','According Invoice')


let SSlRes=await axion.post(PaymentSettings[0]['init_url'],form)




        return {status:"success",data:SSlRes.data}

    }
    catch (e) {
        return {status:"Fail",data:e}
    }
}

const PaymentFailService=async (req)=>{

    try {

        let trxID=req.params.trxID;

        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"Fail"})

        return {status:"Fail"}
    }
    catch (e) {
        return {status:"Fail",data:e}
    }
}

const PaymentCancelService=async (req)=>{

    try {

        let trxID=req.params.trxID;

        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"Cancel"})

        return {status:"Cancel"}
    }
    catch (e) {
        return {status:"Fail",data:e}
    }
}

const PaymentIPNService=async (req)=>{

    try {
        let trxID=req.params.trxID;
        let status=req.body['status'];
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:status})

        return {status:"success"}
    }
    catch (e) {
        return {status:"Fail",data:e}
    }
}

const PaymentSuccessService=async (req)=>{

    try {

        let trxID=req.params.trxID;

        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"Success"})

        return {status:"success"}
    }
    catch (e) {
        return {status:"Fail",data:e}
    }
}


const InvoiceListService=async (req)=>{

    try {
        let user_id=req.headers.user_id;
        let Invoice=await InvoiceModel.find({userID:user_id})
        return {status:"success",data:Invoice}
    }
    catch (e) {
        return {status:"Fail",data:e}
    }
}

const InvoiceProductListService=async (req)=>{

    try {
        let user_id=new ObjectId(req.headers.user_id);
        let invoice_id=new ObjectId(req.params.invoice_id);

        let MatchState={$match:{userID:user_id,invoiceID:invoice_id}}
        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"Product"}}
        let unWindStage={$unwind:"$Product"}

        let products=await InvoiceProductModel.aggregate([
            MatchState,
            JoinStageProduct,
            unWindStage
        ])

        return {status:"success",data:products}
    }
    catch (e) {
        return {status:"Fail",data:e}
    }
}


module.exports={
    InvoiceProductListService,InvoiceListService,PaymentSuccessService,PaymentIPNService,PaymentCancelService,PaymentFailService,
    CreateInvoiceService
}