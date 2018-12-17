const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseIdea = new Schema({
    CourseName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Reason: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CourseIdea',courseIdea);
