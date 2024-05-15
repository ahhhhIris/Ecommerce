const express= require("express")
const router=express.Router()
const {isAdmin,authMiddleware}=require("../middlewares/authMiddleware")
const { createBrand, updateBrand, deleteBrand, getallBrand, getaBrand } = require("../controller/brandCtrl")

router.post('/',authMiddleware,isAdmin,createBrand)
router.put('/:id',authMiddleware,isAdmin,updateBrand)
router.delete('/:id',authMiddleware,isAdmin,deleteBrand)
router.get('/all-brand',getallBrand)
router.get('/:id',getaBrand)

module.exports=router