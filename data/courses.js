let courses = [
    {
    id: 1,
    title: "Node.js",
    description: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
   } ,
   {
    id: 2,
    title: "React",
    description: "React is a JavaScript library for building user interfaces.",
   },
    {
    id: 3,
    title: "MongoDB",
    description: "MongoDB is a NoSQL database.",
   },
  ];

  module.exports = {
    courses: courses,
    // if property name same as value
    // we can type only value without key
    // if we want to export functions or other things
    // we should use exports.functionName = functionName;
    // here is how we can do it : 
    // exports.sum = (a,b)=> a + b; 
    // if we want to export an array or object
    // we should use exports = arrayOrObject;
    // here is how we can do it : 
    // exports = courses;
  };