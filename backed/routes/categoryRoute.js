const express= require("express")
const router=express.Router()
const {isAdmin,authMiddleware}=require("../middlewares/authMiddleware")
const { createCategory, updateCategory, deleteCategory, getallCategory, getaCategory } = require("../controller/categoryCtrl")

router.post('/',authMiddleware,isAdmin,createCategory)
router.put('/:id',authMiddleware,isAdmin,updateCategory)
router.delete('/:id',authMiddleware,isAdmin,deleteCategory)
router.get('/all-category',getallCategory)
router.get('/:id',getaCategory)

module.exports=router