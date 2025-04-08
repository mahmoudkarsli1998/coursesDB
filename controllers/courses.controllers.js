const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const Course = require('../models/course.model');
const httpStatusText = require('../utils/httpStatusTexts');
const asyncWrapper = require('../middleware/asyncwrapper');
const appError = require('../utils/appError');
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const { body, validationResult } = require("express-validator");

// Get all courses
const getAllCourses = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page-1)*limit;
  
  const courses = await Course.find({}, {"__v":false}).limit(limit).skip(skip);
  if (!courses) {
    return next(appError.create("this resourse invalid", 400, "ERROR"));
  }
  
  res.status(200).json({status: httpStatusText.SUCCESS , data: {courses}});
});

// Get a single course by ID
const getCourseById = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return next(appError.create("this resourse invalid", 400, "ERROR"));
  }
  
  res.status(200).json({status: httpStatusText.SUCCESS, data: {course}});
});

// Create a new course
const createCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(appError.create("this resourse invalid", 400, "ERROR"));
  }
  
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({status: httpStatusText.SUCCESS, data: {course: newCourse}});
  } catch (err) {
    return next(appError.create("this resourse invalid", 400, httpStatusText.ERROR));
  }
});

// Update a course
const updateCourse = asyncWrapper(async (req, res, next) => {
  try {
    const updatedCourse = await Course.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    
    if (updatedCourse.matchedCount === 0) {
      return next(appError.create("this resourse invalid", 400, httpStatusText.ERROR));
    }
    
    res.status(200).json({ 
      status: httpStatusText.SUCCESS,
      message: 'Course updated successfully', 
      modifiedCount: updatedCourse.modifiedCount 
    });
  } catch (err) {
    return next(appError.create("this resourse invalid", 400, httpStatusText.ERROR));
  }
});

// Delete a course
const deleteCourse = asyncWrapper(async (req, res, next) => {
  try {
    const deletedCourse = await Course.deleteOne({ _id: req.params.id });
    
    if (deletedCourse.deletedCount === 0) {
      return next(appError.create("this resourse invalid", 400, httpStatusText.ERROR));
    }
    
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  } catch (err) {
    return next(appError.create("this resourse invalid", 400, httpStatusText.ERROR));
  }
});

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};