const express= require("express")
const router=express.Router()
const {isAdmin,authMiddleware}=require("../middlewares/authMiddleware")
const { createCoupon,updateCoupon,getallCoupon,getaCoupon,deleteCoupon } = require("../controller/couponCtrl")

router.post('/',authMiddleware,isAdmin,createCoupon)
router.put('/:id',authMiddleware,isAdmin,updateCoupon)
router.delete('/:id',authMiddleware,isAdmin,deleteCoupon)
router.get('/all-coupon',getallCoupon)
router.get('/:id',getaCoupon)


module.exports=router