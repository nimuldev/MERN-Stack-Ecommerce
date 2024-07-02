const express=require("express")
const ProductController=require('../controllers/ProductController')
const UserController=require('../controllers/UserController')
const WishController=require('../controllers/WishListController')
const CartController=require('../controllers/CartListController')
const InvoiceController=require('../controllers/InvoiceController')
const FeaturesController=require('../controllers/FeatureController')

const AuthVerification=require("../middlewares/AuthVerification")


const router=express.Router();

router.get('/productbrand',ProductController.ProductBrandList)
router.get('/productCategory',ProductController.ProductCategoryList)
router.get('/productSliderList',ProductController.ProductSliderList)
router.get('/productListByBrand/:BrandID',ProductController.productListByBrand)
router.get('/productListByCategory/:CategoryID',ProductController.productListByCategory)
router.get('/productListBySimilar/:CategoryID',ProductController.productListBySimilar)
router.get('/productListByKeyword/:Keyword',ProductController.productListByKeyword)
router.get('/productListByRemark/:Remark',ProductController.productListByRemark)
router.get('/ProductDetails/:ProductID',ProductController.ProductDetails)
router.post('/ProductListByFilter',ProductController.ProductListByFilter)
router.get('/ProductReviewList/:ProductID',ProductController.ProductReviewList)
// User
router.get('/UserOTP/:email',UserController.UserOTPService)
router.get('/VerifyOTP/:email/:otp',UserController.UserOTPVerify)
router.get('/UserLogOut',AuthVerification,UserController.UserLogOut)
router.post('/UserProfile',AuthVerification,UserController.UserProfile)
router.post('/UpdateProfile',AuthVerification,UserController.UserProfile)
router.get('/ReadProfile',AuthVerification,UserController.ReadProfile)

//wish list

router.get('/wishlist',AuthVerification,WishController.Wishlist)
router.post('/wishlistSave',AuthVerification,WishController.SaveWishListService)
router.post('/wishlistRemove',AuthVerification,WishController.RemoveWishListService)

//cart list

router.get('/cartlist',AuthVerification,CartController.CartList)
  router.post('/cartlistSave',AuthVerification,CartController.SaveCartList)
  router.post('/cartlistUpdate/:cartID',AuthVerification,CartController.UpdateCart)
  router.post('/cartlistRemove',AuthVerification,CartController.DeleteCart)

//invoice

router.post('/CreateInvoice',AuthVerification,InvoiceController.CreateInvoiceService)


router.get('/InvoiceList',AuthVerification,InvoiceController.InvoiceListService)
router.get('/InvoiceProductList/:invoice_id',AuthVerification,InvoiceController.InvoiceProductListService)


router.post('/PaymentSuccess/:trxID',InvoiceController.PaymentSuccessService)
router.post('/PaymentCancel/:trxID',InvoiceController.PaymentCancelService)
router.post('/PaymentFail/:trxID',InvoiceController.PaymentFailService)
router.post('/PaymentIPN/:trxID',InvoiceController.PaymentIPNService)

//feature

router.get('/FeaturesList',FeaturesController.FeaturesList)
router.get('/LegalDetails/:type',FeaturesController.LegalDetails)


// Create Review
router.post('/CreateReview',AuthVerification,ProductController.CreateReview)



module.exports=router;