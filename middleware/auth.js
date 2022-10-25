import jwt from 'jsonwebtoken';

const auth = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodeData = jwt.verify(token,'test');
        req.userId = decodeData.id;
        next();
    }catch(err){
        console.log(err);
    }
}

export default auth;