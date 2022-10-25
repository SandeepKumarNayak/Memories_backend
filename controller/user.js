import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signIn = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"User does not exist"});
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Username or Password"});
        const token = jwt.sign({email:user.email,id:user._id},'test',{expiresIn:'1h'});
        // console.log(token);
        res.status(200).json({result:user,token});
    }catch(err){
        res.status(500).json(err);
    }
}
export const signUp = async (req,res)=>{
    try{
        const {firstName,lastName,email,password,confirmPassword} = req.body;
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"User already exist"});
        if(password !== confirmPassword) return res.status(400).json({message:"password are not matched"});
        const hashedPassword = await bcrypt.hash(password,12);
        const data = User.create({email:email,password:hashedPassword,name:`${firstName}${lastName}`})
        const token = jwt.sign({email:data.email,id:data._id},'test',{expiresIn:'1h'});
        // console.log(token);
        res.status(200).json({result:data,token});
    }catch(err){
        res.status(500).json({message:"error"});
    }
}

