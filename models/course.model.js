const mongos = require('mongoose');
require('dotenv').config();

const courseSchema = new mongos.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: true,
        min: 2,
    },
});


 /// Combine Schema into a Model instance
const Course = mongos.model('Course', courseSchema);

module.exports = Course;