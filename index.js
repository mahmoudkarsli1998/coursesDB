const express = require("express");
const app = express();
const { body, validationResult } = require("express-validator");
app.use(express.json());

const { MongoClient } = require('mongodb');
const mongos = require('mongoose');
require('dotenv').config();
const httpStatusText = require('./utils/httpStatusTexts'); // your custom status texts like { ERROR: 'error', SUCCESS: 'success' }
const AppError = require('./utils/appError');
const path = require('path');
// MongoDB connection (example)
const url = process.env.MONGODB_URI;
mongos.connect(url).then(() => {
  console.log("Connected to MongoDB with Mongos");
});

// Register your routers
const courseRouter = require('./routes/app.router');
const usersRouter = require('./routes/users.router');

app.use('/api/courses/', courseRouter);
app.use('/api/users/', usersRouter);
app.use('/uploads',express.static(path.join(__dirname, 'uploads'))); // Serve static files from the public directory

// Global Error-Handling Middleware
// This middleware will catch errors forwarded by next(error) from anywhere in your app
app.use((err, req, res, next) => {
  // If error is an instance of AppError, use its properties for the JSON response
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusText,
      message: err.message,
      // Optionally include additional data if available
      data: err.data || null,
    });
  }
  
  // Fallback for unexpected errors (defaults to 500)
  return res.status(500).json({
    status: httpStatusText.ERROR,
    message: err.message || 'Internal Server Error',
  });
});

// Start your server
app.listen(6003, () => {
  console.log("listening on port 6003");
});
