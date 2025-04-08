const express = require("express");

const app = express();
const {body,validationResult} = require("express-validator");
app.use(express.json());
const { MongoClient } = require('mongodb');

const mongos = require('mongoose');
require('dotenv').config();
const httpStatusText = require('./utils/httpStatusTexts');
// Get the connection string from .env file
const url = process.env.MONGODB_URI;
const client = new MongoClient(url); 

mongos.connect(url).then(()=>{
    console.log("Connected to MongoDB with Mongos");
});


// const main = async () => {
//   try {
//     // Connect to the server
//     await client.connect();
//     console.log("Connected successfully to server");
    
//     // Access your database and collection
//     const db = client.db('codezone');
//     const collection = db.collection('courses');
    
//     // Insert a new document into the collection || Insert Query
//     await collection.insertOne({
//         title: 'new course',
//         price: 2000,
//     });
//     // Get all documents in the collection || GEt Query 
//     const data = await collection.find().toArray();
//     console.log(data);
//   } catch (err) {
//     // Handle any errors
//     console.error("Error connecting to database:", err);
//   } finally {
//     // Always close the connection when done
//     await client.close();
//     console.log("Connection closed");
//   }
// };

// // Run the function
// main();




const baseUrl = '/api/courses/';


/// ------------ CRUD OPERATIONS ------------/// 


const courseRouter = require('./routes/app.router');
// // Global MiddleWare for not found Routes
// app.all('*',(req,res,next)=>{
//   return res.status(404).json({status:httpStatusText.ERROR , message:'this resourse invalid'});
// });
// Global MiddleWare for Error Handler
app.use((error,req,res,next)=>{
  return res.status(404).json({status:httpStatusText.ERROR , message:next(error.message)});
});


app.use('/api/courses/', courseRouter);

 
//---------- Listen to Server --------------------- //
app.listen(6003, () => {
  console.log("listening on port 60003");
});
