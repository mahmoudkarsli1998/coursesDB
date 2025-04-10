const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controllers');

// get all users 
// register 
// login


router.route('/').get(usersController.getAllUsers);
router.route('/register').post(usersController.registerUser);
router.route('/login').post(usersController.loginUser);


module.exports = router;