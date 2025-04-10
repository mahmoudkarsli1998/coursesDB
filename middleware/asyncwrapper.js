// const { error } = require("console");

// module.exports = (asyncFn)=>{
//     return (req,res,next)=>{
//         asyncFn(req,res,next).catch((error)=>{
//             next(error);
//         });
//     };
// }
const { error } = require("console"); // You can remove this line as it's not used
const AppError = require('../utils/appError');

module.exports = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch((error) => {
            next(error);
        });
    };
}