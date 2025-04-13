const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controllers');
const verifyToken = require('../middleware/verifyToken');
const multer  = require('multer');
const httpStatusText = require('../utils/httpStatusTexts');
const AppError = require('../utils/appError');


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const filename  = `${file.fieldname}-${Date.now()}.${ext}`;
        const allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
      cb(null,filename);
    }
  });
const fileFilter = (req, file, cb) =>{
    const imageType = file.mimetype.split('/')[0];
    if(imageType === 'image'){
        return cb(null,true);
    }else{
        return cb(AppError.create('Only images are allowed',400),false);
    }
    
};
  const uploads = multer({
    storage: diskStorage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB
    },
    fileFilter: fileFilter
    });
// get all users 
// register 
// login


router.route('/').get(verifyToken,usersController.getAllUsers);
router.route('/register').post(uploads.single('avatar'),usersController.registerUser);
router.route('/login').post(usersController.loginUser);


module.exports = router;