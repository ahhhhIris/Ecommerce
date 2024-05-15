const { generateToken } = require('../config/jwtToken');
const User=require('../models/userModel');
const Product=require("../models/productModel")
const Cart=require("../models/cartModel")
const Coupon=require("../models/couponModel")
const Order=require("../models/orderModel")

const asyncHandler = require("express-async-handler");
const validateMongoDbId = require('../utils/validateMongodbid');
const uniqid=require("uniqid")
const { generateRefreshToken } = require('../config/refreshtoken');
const jwt=require("jsonwebtoken");
const sendEmail = require('./emailCtrl');
const crypto=require("crypto");
const { log } = require('console');
const { isNull } = require('util');
const { truncate } = require('fs/promises');
const createUser= asyncHandler(async(req,res)=>{
    const email=req.body.email;
    const findUser=await User.findOne({email:email});
    if(!findUser){
        //Create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else{
        throw new Error("User Already Exists")
    }
})

//login a user
const loginUserCtrl=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    //check if user exists or not
    const findUser=await User.findOne({email});
    if(findUser && (await findUser.isPasswordMatched(password))){
        const refreshToken=await generateRefreshToken(findUser?._id)
        const updateuser=await User.findByIdAndUpdate(findUser.id,{
            refreshToken:refreshToken,
        },{
            new:true
        });
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            maxAge:72*60*60*1000,
        })
        res.json({
            _id:findUser?._id,
            firstname:findUser?.firstname,
            lastname:findUser?.lastname,
            email:findUser?.email,
            mobile:findUser?.mobile,
            token:generateToken(findUser?._id)
        })
    }else{
        throw new Error("Invalid Credentials");
    }
})

//login admin
const loginAdmin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    //check if user exists or not
    const findAdmin=await User.findOne({email});
    if(findAdmin.role !=='admin') throw new Error("Not Authorised")
    if(findAdmin && (await findAdmin.isPasswordMatched(password))){
        const refreshToken=await generateRefreshToken(findAdmin?._id)
        const updateuser=await User.findByIdAndUpdate(findAdmin.id,{
            refreshToken:refreshToken,
        },{
            new:true
        });
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            maxAge:72*60*60*1000,
        })
        res.json({
            _id:findAdmin?._id,
            firstname:findAdmin?.firstname,
            lastname:findAdmin?.lastname,
            email:findAdmin?.email,
            mobile:findAdmin?.mobile,
            token:generateToken(findAdmin?._id)
        })
    }else{
        throw new Error("Invalid Credentials");
    }
})
//handle refresh token
const handleRefreshToken= asyncHandler(async(req,res)=>{
    const cookie= req.cookies;
    if(!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');
    const refreshToken=cookie.refreshToken;
    console.log(refreshToken);
    const user= await User.findOne({refreshToken});
    if(!user) throw new Error('No Refresh token present in db or nor matched')
    jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded)=>{
    if(err || user.id !== decoded.id){
        throw new Error('There is something wrong with refresh token')
    }
    const accessToken=generateToken(user?._id)
    res.json({accessToken})
})
})

const logout= asyncHandler(async(req,res)=>{
    const cookie= req.cookies;
    if(!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');
    const refreshToken=cookie.refreshToken;
    const user= await User.findOne({refreshToken});
    if(!user){
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:true,
        })
        return res.sendStatus(204) //forbidden
    }
    await User.findOneAndUpdate({refreshToken:refreshToken},{
        refreshToken:"",
    })
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true,
    })
    res.sendStatus(204) //forbidden
})

//update a user
const updatedUser=asyncHandler(async(req,res)=>{
    const{_id}=req.user;
    validateMongoDbId(_id)
    try{
        const updatedUser=await User.findByIdAndUpdate(_id,{
            firstname:req?.body?.firstname,
            lastname:req?.body?.lastname,
            email:req?.body?.email,
            mobile:req?.body?.mobile,
        },{
            new:true,
        })
        res.json(updatedUser)
    }catch(error){
        throw new Error(error)
    }
})


//get all users
const getallUser=asyncHandler(async (req,res)=>{
    try{
        const getUsers=await User.find()
        res.json(getUsers)  
    }catch(error){
        throw new Error(error)
    }
})

//get a single user
const getaUser=asyncHandler(async(req,res)=>{
    const {id}=req.params
    validateMongoDbId(id)
    try{
        const getaUser=await User.findById(id);
        res.json({
            getaUser
        })
    }catch(error){
        throw new Error(error)
    }
})

//delete a single user
const deleteaUser=asyncHandler(async(req,res)=>{
    const {id}=req.params
    validateMongoDbId(id)
    try{
        const delaUser=await User.findByIdAndDelete(id);
        res.json({
            delaUser
        })
    }catch(error){
        throw new Error(error)
    }
})

const blockUser= asyncHandler(async(req,res)=>{
    const {_id}=req.params;
    validateMongoDbId(_id)
    try{
        const block =await User.findById( _id,{
            isBlocked:true,
        },{
            new:true,
        })
        res.json({
            message:"User Blocked"
        })
    }catch(error){
        throw new Error(error);
    }
});

const unblockUser= asyncHandler(async(req,res)=>{
    const {_id}=req.params;
    validateMongoDbId(_id)
    try{
        const block =await User.findById( _id,{
            isBlocked:false,
        },{
            new:true,
        })
        res.json({
            message:"User Unblocked"
        })
    }catch(error){
        throw new Error(error);
    }
});

const updatePassword=asyncHandler(async(req,res)=>{
    const{_id}=req.user
    const {password}=req.body
    validateMongoDbId(_id)
    const user= await User.findById(_id)
    if(password){
        user.password=password
        const updatePassword= await user.save()
        res.json(updatePassword)
    }else{
        res.json(user)
    }
})

const forgotPasswordToken = asyncHandler(async(req,res)=>{
    const{email}=req.body
    const user=await User.findOne({email})
    if(!user) throw new Error('User is not found with this email')
    try{
        const token=await user.createPasswordResetToken()
        await user.save();
        const resetURL= `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</a>`
        const data={
            to:email,
            subject:"Forgot Password Link",
            text:"Hey User",
            html:resetURL
        }
        sendEmail(data)
        res.json(token)
    }catch(error){
        throw new Error(error)
    }

})

const resetPassword=asyncHandler(async(req,res)=>{
    const {password}=req.body
    const{token}=req.params
    const hashedToken=crypto.createHash("sha256").update(token).digest("hex")
    const user=await User.findOne({
        passwordResetToken:hashedToken,
        passwordResetExpires:{$gt:Date.now()}
    })
    //console.log(user);
    if(!user)throw new Error("Token Expired, Please try again later")
    user.password=password
    user.passwordReSetToken=undefined
    user.passwordResetExpires=undefined
    await user.save()
    res.json(user)
// 
})

const getWishlist=asyncHandler(async(req,res)=>{
    const {_id}=req.user
    try{
        const findUser=await User.findById(_id).populate('wishlist')
        res.json(findUser)
    }catch(error){
        throw new Error(error)
    }
})

//save user address
const saveAddress = asyncHandler(async(req,res)=>{
    const{_id}=req.user;
    validateMongoDbId(_id)
    try{
        const updatedUser=await User.findByIdAndUpdate(_id,{
            address:req?.body?.address,
        },{
            new:true,
        })
        res.json(updatedUser)
    }catch(error){
        throw new Error(error)
    }
})

const userCart=asyncHandler(async(req,res,next)=>{
    const{productId,quantity,price}=req.body
    const{_id}=req.user
    //console.log(_id);
    validateMongoDbId(_id)
    try{
        let newCart=await new Cart({
            userId:_id,
            productId:productId,
            price:price,
            quantity:quantity
        }).save()
        res.json(newCart)
    }catch(error){
        throw new Error(error)
    }
})

const getUserCart=asyncHandler(async(req,res)=>{
    const {_id}=req.user
    validateMongoDbId(_id)
    try{
        const cart=await Cart.find({userId:_id}).populate("productId").populate("userId")
        // console.log(cart);
        res.json(cart)
    }catch(error){
        throw new Error(error)
    }
})

const deleteProCart=asyncHandler(async(req,res)=>{
    const{id}=req.params
    validateMongoDbId(id)
    try{
        const deleteProCart = await Cart.findByIdAndDelete(id)
        res.json(deleteProCart)
    }catch(error){
        throw new Error(error)
    }

})
const updateCartQuantity=asyncHandler(async(req,res)=>{
    const{id}=req.params
    const{quantity}=req.body
    validateMongoDbId(id)
    try{
        const updateQuantity = await Cart.findByIdAndUpdate(id,{
            quantity:quantity
        },{new:true})
        res.json(updateQuantity)
    }catch(error){
        throw new Error(error)
    }

})

const emptyCart=asyncHandler(async(req,res)=>{
    const{_id}=req.user
    //console.log(_id);
    validateMongoDbId(_id)
    try{
        const user=await User.findOne({_id})
        const cart = await Cart.findOneAndDelete({orderby:user._id})
        res.json(cart)
    }catch(error){
        throw new Error(error)
    }

})

const applyCoupon=asyncHandler(async(req,res)=>{
    const{_id}=req.user
    validateMongoDbId(_id)
    const{coupon}=req.body
    const validCoupon=await Coupon.findOne({name:coupon})
    if(validCoupon===null){
        throw new Error("Invalid Coupon")
    }
    const user=await User.findById(_id)
    let {products,cartTotal}=await Cart.findOne({orderby:user._id}).populate("products.product")
    let totalAfterDiscount=(cartTotal-(cartTotal*validCoupon.discount/100).toFixed(2))
    const updateCart=await Cart.findOneAndUpdate({orderby:user._id},{totalAfterDiscount},{new:truncate})
    res.json(updateCart)
})

const createOrder = asyncHandler(async (req, res) => {
    const { shippingInfo, orderItem,totalPrice,totalPriceAfterDiscount } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const order=await Order.create({user:_id,orderItem:orderItem, shippingInfo:shippingInfo,totalPrice:totalPrice,totalPriceAfterDiscount:totalPriceAfterDiscount})
     res.json({order, success: true});
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getMyOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const userorders = await Order.find({ user: _id })
        .populate("orderItem.products")
        .populate("user")
        .exec();
      res.json(userorders);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getSingleOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const order = await Order.findOne({ _id: id })
      .populate("orderItem.products")
      .populate("user")
      res.json(order);
    } catch (error) {
      throw new Error(error);
    }
  });

  const getAllOrders = asyncHandler(async (req, res) => {
    try {
      const alluserorders = await Order.find()
        .populate("orderItem.products")
        .populate("user")
        .exec();
      res.json(alluserorders);
    } catch (error) {
      throw new Error(error);
    }
  });
  const getOrderByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const userorders = await Order.findOne({ user: id })
        .populate("orderItem.products")
        .populate("user")
        .exec();
      res.json(userorders);
    } catch (error) {
      throw new Error(error);
    }
  });
  const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updateOrderStatus = await Order.findByIdAndUpdate(
        id,
        {
          orderStatus: status,
        },
        { new: true }
      );
      res.json(updateOrderStatus);
    } catch (error) {
      throw new Error(error);
    }
  });

const getMonthWiseOrderIncome=asyncHandler(async(req,res)=>{
    // const {_id}=req.user
    // validateMongoDbId(_id)
    let monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let d=new Date()
    let endDate=""
    d.setDate(1)
    for(let i=1;i<11;i++){
        d.setMonth(d.getMonth()-1)
        endDate=monthNames[d.getMonth()]+" "+d.getFullYear()
    }
    const data=await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $lte: new Date(), 
                    $gte: new Date(endDate) 
                }
            }
        },
        {
            $group: {
                _id: { $month: "$createdAt" }, 
                amount: { $sum: "$totalPriceAfterDiscount" }, 
                count: { $sum:1 }
            }
        }
    ])
    res.json(data)
})

const getYearlyTotalOrders=asyncHandler(async(req,res)=>{
    // const {_id}=req.user
    // validateMongoDbId(_id)
    let monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let d=new Date()
    let endDate=""
    d.setDate(1)
    for(let i=1;i<11;i++){
        d.setMonth(d.getMonth()-1)
        endDate=monthNames[d.getMonth()]+" "+d.getFullYear()
    }
    const data=await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $lte: new Date(), 
                    $gte: new Date(endDate) 
                }
            }
        },
        {
            $group: {
                _id: null, 
                amount: { $sum: "$totalPriceAfterDiscount" }, 
                count: { $sum:1 },
            }
        }
    ])
    res.json(data)
})



module.exports={createUser,loginUserCtrl,getallUser
    ,getaUser,deleteaUser,updatedUser,blockUser
    ,unblockUser,handleRefreshToken,logout,updatePassword,
    forgotPasswordToken,resetPassword,loginAdmin,getWishlist
    ,saveAddress,userCart,getUserCart,emptyCart,applyCoupon,createOrder
    ,getAllOrders,updateOrderStatus,getOrderByUserId,getMyOrders,
    getMonthWiseOrderIncome,
    getYearlyTotalOrders,getSingleOrder,
    deleteProCart,updateCartQuantity};