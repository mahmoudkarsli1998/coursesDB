const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusTexts');
const generateJWT = require('../utils/generate.JWT');

const asyncWrapper = require('../middleware/asyncwrapper');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = asyncWrapper(async (req, res, next) => {
    console.log(req.headers);
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page-1)*limit;
  // to exclude password from the response
  // const users = await User.find({}, {"__v":false} , {'password':false}).limit(limit).skip(skip);
  const users = await User.find({}, {"__v":false}).limit(limit).skip(skip);
  if (!users) {
    return next(AppError.create("this resourse invalid", 400, "ERROR"));
  }
  
  res.status(200).json({status: httpStatusText.SUCCESS , data: {users}});
});
const registerUser = asyncWrapper(async (req,res  ,next) => {
    console.log(req.body);
    const {name,email,password,role}  = req.body;
    const existUser = await User.findOne({email});
    if(existUser){
        const error = AppError.create("User already exists", 400, httpStatusText.ERROR);
        return next(error);
    }

    // encrypt password hash
     const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password:hashedPassword,
        role
    });

    // generate JWT token
    // const token = await jwt.sign({email:newUser.email , id:newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
    const token =await generateJWT({email:newUser.email , id:newUser._id});

    console.log(token);
    newUser.token = token;
    await newUser.save();
    res.status(201).json({status: httpStatusText.SUCCESS, data: {user: newUser}});
}); 

const loginUser = asyncWrapper(async(req,res,next) => {
    const {email,password} = req.body;
    if(!email && !password){
        const error = AppError.create("Email and Password are Required", 400, httpStatusText.FAIL);
        return next(error);
    }
    const user  = await User.findOne({email:email}); 

    if(!user){
        const error = AppError.create("User Not Found", 400, httpStatusText.FAIL);
        return next(error);
    }
    const matchedPassword = await bcrypt.compare(password,user.password); 


    if(user && matchedPassword){

        const token = await generateJWT({email:user.email , id:user._id});

        res.status(200).json({status: httpStatusText.SUCCESS, data: {token:token}});
    }else{
        const error = AppError.create("Something Went Wrong", 500, httpStatusText.ERROR);
        return next(error);
    }
});


module.exports={
    getAllUsers,
    registerUser,
    loginUser
};