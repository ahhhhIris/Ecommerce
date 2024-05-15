const Product = require('../models/productModel')
const asyncHandler = require("express-async-handler");
const User=require("../models/userModel")
const slugify=require("slugify");
const validateMongoDbId = require('../utils/validateMongodbid');
const { cloudinaryUploadImg,cloudinaryDeleteImg } = require('../utils/cloudinary');
const fs=require("fs");
const { log } = require('console');
const createProduct=asyncHandler(async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title)
        }
        const newProduct= await Product.create(req.body);
        res.json(newProduct)
    }catch(error){
        throw new Error(error)
    }
    
})


const getaProduct=asyncHandler(async (req,res)=>{
    const {id}=req.params
    try{
        const getaProduct=await Product.findById(id);
        res.json(
            getaProduct
        )
    }catch(error){
        throw new Error(error)
    }
})

const getallProduct=asyncHandler(async (req,res)=>{
    try{

        //Filtering
        const queryObj={...req.query}
        const excludeFields=["page","sort","limit","fields"]
        excludeFields.forEach(el=>delete queryObj[el])

        let queryStr=JSON.stringify(queryObj)
        //筛选范围过程 没看懂思密达
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)
        

        let query=Product.find (JSON.parse(queryStr))

        //Sorting
        if(req.query.sort){
            const sortBy=req.query.sort.split(',').join(" ")
            query=query.sort(sortBy)
        }else{
            query=query.sort('-createdAt')
        }

        //limiting field
        if(req.query.fields){
            const fields=req.query.fields.split(',').join(" ")
            query=query.select(fields)
        }else{
            query=query.select("-__v")
        }

        //pagination
        const page=req.query.page
        const limit=req.query.limit
        const skip=(page -1)*limit
        query=query.skip(skip).limit(limit)
        if(req.query.page){
            const productCount=await Product.countDocuments()
            if(skip>=productCount) throw new Error('This page is not exists')
        }

        const product=await query;
        res.json(product)  
    }catch(error){
        throw new Error(error)
    }
})

const deleteaProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params
    try{
        const delaUser=await Product.findByIdAndDelete(id);
        res.json({
            delaUser
        })
    }catch(error){
        throw new Error(error)
    }
})

const updatedProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title)
        }
        const updatedProduct=await Product.findOneAndUpdate({ _id: id },
            req.body
        ,{
            new:true,
        })
        res.json(updatedProduct)
    }catch(error){
        throw new Error(error)
    }
})

const addToWishlist=asyncHandler(async(req,res)=>{
    const {_id}=req.user
    const {prodId}=req.body
    try{
        const user=await User.findById(_id)
        const alreadyAdded=user.wishlist.find((id)=>id.toString()===prodId)
        if(alreadyAdded){
            let user=await User.findByIdAndUpdate(_id,{
                $pull:{wishlist:prodId}
            },{new:true})
            res.json(user)
        }else{
            let user=await User.findByIdAndUpdate(_id,{
                $push:{wishlist:prodId}
            },{new:true})
            res.json(user)
        }
    }catch(error){
        throw new Error(error)
    }
})

const rating=asyncHandler(async(req,res)=>{
    const {_id}=req.user
    const {comment,star,prodId}=req.body
    const product=await Product.findById(prodId)
    let alreadyRating=product.ratings.find((userId)=>userId.postedby.toString()===_id.toString())
    try{
        if(alreadyRating){
            const updateRating=await Product.updateOne({
                ratings:{$elemMatch:alreadyRating}},{
                    $set:{"ratings.$.star":star,"ratings.$.comment":comment}
            },{new:true})
        }else{
            const rateProduct=await Product.findByIdAndUpdate(prodId,{
                $push:{
                    ratings:{
                        star:star,
                        postedby:_id,
                        comment:comment}}
            },{new:true})
        }
        const getAllRatings=await Product.findById(prodId)
        let totalRating=getAllRatings.ratings.length
        let ratingSum=getAllRatings.ratings
        .map((item)=>item.star)
        .reduce((prev,curr)=>prev+curr,0)
        let actualRating=Math.round(ratingSum/totalRating)
        let finalProduct=await Product.findByIdAndUpdate(prodId,{
            totalRating:actualRating
        },{new:true})
        res.json(finalProduct)
    }catch(error){
        throw new Error(error)
    }
})

const uploadImages=asyncHandler(async(req,res)=>{
    try{
        const uploader=(path)=>cloudinaryUploadImg(path,"images")
        const urls=[]
        const files=req.files
        for(const file of files){
            const{path}=file
            const newpath=await uploader(path)
            urls.push(newpath)
            //fs.unlinkSync(path)
        }
        const images=urls.map((file)=>{return file})
        res.json(images)
    }catch(error){
        throw new Error(error)
    }
})

const deleteImages=asyncHandler(async(req,res)=>{
    const{id}=req.params
    try{
        const deleted=cloudinaryDeleteImg(id,"images")
        res.json({message:"Deleted"})
    }catch(error){
        throw new Error(error)
    }
})

module.exports={createProduct,getaProduct,getallProduct,deleteaProduct,updatedProduct,addToWishlist,rating,uploadImages,deleteImages}