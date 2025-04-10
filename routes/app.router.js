const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const coursesController = require('../controllers/courses.controllers');
const verifyToken = require('../middleware/verifyToken');
const allowedTo = require('../middleware/allowedTo');
const userRoles = require('../utils/userRoles');


// GET all courses
router.get('/', coursesController.getAllCourses);

// GET a specific course
router.get('/:id', coursesController.getCourseById);

// POST create a new course
router.post('/', verifyToken,allowedTo(userRoles.ADMIN),coursesController.createCourse);

// PATCH update a course
router.patch('/:id', coursesController.updateCourse);

// DELETE a course
router.delete('/:id',verifyToken,allowedTo(userRoles.ADMIN),coursesController.deleteCourse);

module.exports = router;