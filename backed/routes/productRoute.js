const express= require("express")
const { createProduct, getaProduct, getallProduct, deleteaProduct, updatedProduct, addToWishlist, rating, uploadImages, deleteImages } = require("../controller/productCtrl")
const router=express.Router()
const {isAdmin,authMiddleware}=require("../middlewares/authMiddleware")
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages")


router.put("/upload",authMiddleware,isAdmin,uploadPhoto.array("images",10),productImgResize,uploadImages)

router.put("/wishlist",authMiddleware,addToWishlist)
router.put("/rating",authMiddleware,rating)

router.get("/all-products",getallProduct) //固定路径的路由放在前面
router.get("/:id",getaProduct)
router.put("/:id",authMiddleware,isAdmin,updatedProduct)
router.delete("/:id",authMiddleware,isAdmin,deleteaProduct)
router.delete("/delete-img/:id",authMiddleware,isAdmin,deleteImages)
router.post("/",authMiddleware,isAdmin,createProduct)
module.exports=router