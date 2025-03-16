const { MongoClient ,ObjectId} = require('mongodb');
require('dotenv').config();

const Course = require('../models/course.model');
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    // await client.connect();
    // const db = client.db('codezone');
    // const collection = db.collection('courses');
    
    // const courses = await collection.find().toArray();
    // res.status(200).json(courses);
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await client.close();
  }
};

// Get a single course by ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    // await client.connect();
    // const db = client.db('codezone');
    // const collection = db.collection('courses');
    
    const course = await Course.findById(id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await client.close();
  }
};

// Create a new course
const createCourse = async (req, res) => {
  try {
    // const { title, price } = req.body;
    // await client.connect();
    // const db = client.db('codezone');
    // const collection = db.collection('courses');
    
    // const result = await collection.insertOne({ title, price });
    // res.status(201).json({ id: result.insertedId, title, price });

    const newCourse = new Course(req.body);
     await newCourse.save();
     res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await client.close();
  }
};

// Update a course
// Update a course
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedCourse = await Course.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    
    if (updatedCourse.matchedCount === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    return res.status(200).json({ 
      message: 'Course updated successfully', 
      modifiedCount: updatedCourse.modifiedCount 
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.deleteOne(
      { _id: id },
      
    );
    // await client.connect();
    // const db = client.db('codezone');
    // const collection = db.collection('courses');
    
    // const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCourse === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
  res.status(200).json({ success:true ,  msg: deletedCourse});
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await client.close();
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};