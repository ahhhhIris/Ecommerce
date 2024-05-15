const express=require('express');
const router=express.Router();
const {createUser, loginUserCtrl, getallUser, 
    getaUser, deleteaUser, updatedUser,blockUser,
    unblockUser, handleRefreshToken,logout, updatePassword, forgotPasswordToken, resetPassword, 
    loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, 
    createOrder, updateOrderStatus, getAllOrders, getOrderByUserId, getMyOrders, 
    getMonthWiseOrderIncome, getYearlyTotalOrders, getSingleOrder, deleteProCart, updateCartQuantity}=require("../controller/userCtrl");
const{authMiddleware,isAdmin}=require('../middlewares/authMiddleware');


router.post('/login',loginUserCtrl);
router.post("/logout",logout)
router.post('/admin-login',loginAdmin);
router.post('/register',createUser);
router.post('/forgot-password-token',forgotPasswordToken)
router.post("/cart/applyCoupon",authMiddleware,applyCoupon)
router.post("/cart",authMiddleware,userCart)
router.post("/cart/create-order",authMiddleware,createOrder)
//Admin check UserOrder
router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getOrderByUserId);
router.get("/getYearlyTotalOrders",authMiddleware,isAdmin,getYearlyTotalOrders)
router.get("/getMonthWiseIncome",authMiddleware,isAdmin,getMonthWiseOrderIncome)
router.get('/all-users',getallUser);
router.get("/refresh",handleRefreshToken)
router.get("/wishlist",authMiddleware,getWishlist)
router.get("/get-cart",authMiddleware,getUserCart)
//User
router.get("/get-my-orders", authMiddleware, getMyOrders);
//Admin
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getsingleorder/:id", authMiddleware, getSingleOrder);
router.get("/:id",authMiddleware,isAdmin,getaUser)

router.delete("/cart/:id",authMiddleware,deleteProCart)
router.delete("/empty-cart",authMiddleware,emptyCart)
router.delete("/:id",deleteaUser)

router.put('/updatecart/:id',updateCartQuantity)
router.put('/reset-password/:token',resetPassword)
router.put('/password',authMiddleware,updatePassword)
router.put("/edit-user",authMiddleware,updatedUser)
router.put("/update-order/:id",authMiddleware,isAdmin,updateOrderStatus)
router.put("/save-address",authMiddleware,saveAddress)
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser)

module.exports=router;