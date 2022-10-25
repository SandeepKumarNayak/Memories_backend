import Post from "../model/post.js";
import mongoose from "mongoose";
import express from 'express';

const router = express.Router();

export const createPost = async (req,res)=>{
    try{
        const post = req.body;
        if(!req.userId){
            return res.json({message:"You are Unauthorized"});
        }
        const newPost = new Post({title:post.title,subTitle:post.subTitle,message:post.message,image:post.image,userId:req.userId});
        await newPost.save();
        res.status(201).json(newPost)
    }catch(err){
        res.status(500).json({message:"Somethin went Wrong in create Post",err});
    }
}
export const getPost = async(req,res)=>{
    const {id} = req.params;
    try{
        const post = await Post.findById(id);
        res.status(200).json(post);
    }catch(err){
        res.status(404).json({message:"Error in Get Post By Id",err});
    }
}
export const getPosts = async(req,res)=>{
    const {page} = req.query;
    try{
        const LIMIT = 20;
        const sIndx = (Number(page)-1)*LIMIT;
        const total = Post.countDocuments({});
        const posts = await Post.find().sort({_id:-1}).limit(LIMIT).skip(sIndx);
        res.status(200).json(posts);
        // res.status(200).json({data:posts,currentPage:Number(page),numberOfPage:Math.ceil(total/LIMIT)});
    }catch(err){
        res.status(500).json({message:"Error in Fetch All post",err});
    }
}

export const getPostBySearch = async (req,res)=>{
    const {serchQuery,tags} = req.query;
    try{
        const title = new RegExp(serchQuery,'i');
        const posts = await Post.find({$or:[{title},{tags:{$in:tags.split(',')}}]});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message:"Error in getPost By Query",err});
    }
}

export const deletePost = async(req,res) =>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Id is not Valid"}); 
        }
        const userId = req.userId;
        if(userId){
            const post = await Post.findById(id);
            if(post.userId === userId){
                await Post.findByIdAndRemove(id);
                res.status(200).json({message:"Post deleted Successfully"});
            }else{
                return res.status(400).json({message:"Unauthorised User"});
            }
        }else{
            return res.status(400).json({message:"Unauthorised User"});
        }
    }catch(err){
        res.status(500).json({message:"Error in delete Post"});
    }
}


export const updatePost = async(req,res) =>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Id is not Valid"}); 
        }
        const userId = req.userId;
        if(userId){
            const post = await Post.findById(id);
            if(post.userId === userId){
                const newPost = req.body;
                const updatePost = await Post.findByIdAndUpdate(id,{...newPost,id},{new:true});
                res.status(200).json(updatePost);
            }else{
                return res.status(400).json({message:"Unauthorised User"});
            }
        }else{
            return res.status(400).json({message:"Unauthorised User"});
        }
    }catch(err){
        res.status(500).json({message:"Error in UPDATE Post"});
    }
}


export const likePost = async(req,res) =>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Id is not Valid"}); 
        }
        const userId = req.userId;
        if(userId){
            const post = await Post.findById(id);
            const index = await post.likes.findIndex((id)=>id===userId);
            if(index === -1){
                post.likes.push(userId);
            }else{
                await post.likes.pop(id);
                // post.likes =await post.likes.filter((id)=>id === String(userId));
            }
            const updatePost = await Post.findByIdAndUpdate(id,post,{new:true});
            res.status(200).json(updatePost);
        }else{
            return res.status(400).json({message:"Unauthorised User"});
        }
    }catch(err){
        res.status(500).json({message:"Error in LIKE Post"});
    }
}

export default router