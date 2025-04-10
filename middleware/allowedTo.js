const httpStatusText = require('../utils/httpStatusTexts');
const AppError = require('../utils/appError');

module.exports = (...userRoles)=>{

    return (req,res,next)=>{
        if(!userRoles.includes(req.currentUser.role)){
            const error = AppError.create("You are not allowed to access this route", 403, httpStatusText.ERROR);
            return next(error);
        }
        next();
    };
};

/**
 * export default (...userRoles)=>{

    return (req,res,next)=>{
        next();
    };
};
 * 
 */
