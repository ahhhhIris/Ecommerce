const express= require("express")
const router=express.Router()
const {isAdmin,authMiddleware}=require("../middlewares/authMiddleware")
const { createEnquiry, updateEnquiry, deleteEnquiry, getallEnquiry, getaEnquiry } = require("../controller/enqCtrl")

router.post('/',createEnquiry)
router.delete('/:id',authMiddleware,isAdmin,deleteEnquiry)
router.get('/all-enq',getallEnquiry)
router.get('/:id',getaEnquiry)
router.put('/:id',updateEnquiry)

module.exports=router