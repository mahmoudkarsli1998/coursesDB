const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusTexts');
const AppError = require('../utils/appError');

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers['Authorization']|| req.headers['authorization'];
    if(!authHeader){
        const error = AppError.create("Unauthorized Token is Required", 401, httpStatusText.ERROR);
        return next(error);
        // return res.status(401).json({message:"Unauthorized Token is Required"});
    }
    const token = authHeader.split(' ')[1];
    try{
       jwt.verify(token,process.env.JWT_SECRET_KEY);
       next();
    }catch(err){
        const error = AppError.create("Invalid Token", 401, httpStatusText.ERROR);
        return next(error);
        // return res.status(401).json({message:"Invalid Token"});
    }
};

module.exports = verifyToken;