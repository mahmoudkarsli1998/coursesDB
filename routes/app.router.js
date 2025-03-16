const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const coursesController = require('../controllers/courses.controllers');

// GET all courses
router.get('/', coursesController.getAllCourses);

// GET a specific course
router.get('/:id', coursesController.getCourseById);

// POST create a new course
router.post('/', coursesController.createCourse);

// PATCH update a course
router.patch('/:id', coursesController.updateCourse);

// DELETE a course
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;