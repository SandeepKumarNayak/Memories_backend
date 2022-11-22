import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
// import dotenv from 'dotenv';

import userRoute from './routes/user.js';
import postRoute from './routes/post.js';

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:"true"}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:"true"}));
app.use(cors());

app.use('/user',userRoute);
app.use('/post',postRoute)

const CONNECTION_URL = '';
// const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`server is running on port ${PORT}`)))
.catch((err)=>console.log(err.message));
