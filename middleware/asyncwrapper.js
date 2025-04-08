const { error } = require("console");

module.exports = (asyncFn)=>{
    return (req,res,next)=>{
        asyncFn(req,res,next).catch((error)=>{
            next(error);
        });
    };
}