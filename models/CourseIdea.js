const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseIdea = new Schema({
    course_name: {
        type: String,
        required: true
    },
    description: {
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

mongoose.model('CourseIdea',courseIdea);
