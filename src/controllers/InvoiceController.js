const {InvoiceProductListService,InvoiceListService,PaymentSuccessService,PaymentIPNService,PaymentCancelService,PaymentFailService,CreateInvoiceService
} =require("../services/InvoiceServices")


exports.CreateInvoiceService=async (req,res)=>{
    let result=await CreateInvoiceService(req)
    return res.status(200).json(result)
}

exports.InvoiceProductListService=async (req,res)=>{
    let result=await InvoiceProductListService(req)
    return res.status(200).json(result)
}
exports.InvoiceListService=async (req,res)=>{
    let result=await InvoiceListService(req)
    return res.status(200).json(result)
}

exports.PaymentSuccessService=async (req,res)=>{
    let result=await PaymentSuccessService(req)
    return res.status(200).json(result)
}

exports.PaymentIPNService=async (req,res)=>{
    let result=await PaymentIPNService(req)
    return res.status(200).json(result)
}

exports.PaymentCancelService=async (req,res)=>{
    let result=await PaymentCancelService(req)
    return res.status(200).json(result)
}

exports.PaymentFailService=async (req,res)=>{
    let result=await PaymentFailService(req)
    return res.status(200).json(result)
}

