const express= require("express")
const router=express.Router()
const {isAdmin,authMiddleware}=require("../middlewares/authMiddleware")
const { createColor, updateColor, deleteColor, getallColor, getaColor } = require("../controller/colorCtrl")

router.post('/',authMiddleware,isAdmin,createColor)
router.put('/:id',authMiddleware,isAdmin,updateColor)
router.delete('/:id',authMiddleware,isAdmin,deleteColor)
router.get('/all-color',getallColor)
router.get('/:id',getaColor)

module.exports=router