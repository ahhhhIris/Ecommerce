const Category=require("../models/categoryModel")
const asyncHandler=require("express-async-handler")
const validateMongoDbId=require("../utils/validateMongodbid")

const createCategory=asyncHandler(async(req,res)=>{
    try{
        const newCategory=await Category.create(req.body)
        res.json(newCategory)
    }catch(error){
        throw new Error(error)
    }
})

const updateCategory=asyncHandler(async(req,res)=>{
    const{title}=req.params
    validateMongoDbId(id)
    try{
        const updateCategory=await Category.findOneAndUpdate({title:title},req.body,{new:true})
        res.json(updateCategory)
    }catch(error){
        throw new Error(error)
    }
})

const deleteCategory=asyncHandler(async(req,res)=>{
    const{id}=req.params
    validateMongoDbId(id)
    try{
        const deleteCategory=await Category.findByIdAndDelete(id)
        res.json(deleteCategory)
    }catch(error){
        throw new Error(error)
    }
})

const getaCategory=asyncHandler(async(req,res)=>{
    const{id}=req.params
    validateMongoDbId(id)
    try{
        const getaCategory=await Category.findById(id)
        res.json(getaCategory)
    }catch(error){
        throw new Error(error)
    }
})

const getallCategory=asyncHandler(async(req,res)=>{
    try{
        const getallCategory=await Category.find()
        res.json(getallCategory)
    }catch(error){
        throw new Error(error)
    }
})

module.exports={createCategory,updateCategory,deleteCategory,getaCategory,getallCategory}