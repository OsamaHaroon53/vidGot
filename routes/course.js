const express = require('express');
const router = express.Router();

const course = require('../models/CourseIdea');

router.get('/add', (req, res) => {
    res.render('course/add');
});

router.get('/edit/:id', (req, res) => {
    course.findOne({ _id: req.params.id })
        .then(data => {
            res.render('course/edit', { course: data });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/', (req, res) => {
    course.find()
        .sort({ date: 'desc' })
        .then(data => {
            res.render('course/index', { data: data });
        })
        .catch(err => {
            console.log(err);
        });

});

router.post('/', (req, res) => {
    let errors = [];
    if (!req.body.name) {
        errors.push({ text: 'Empty Course Name' });
    }
    if (!req.body.description) {
        errors.push({ text: 'Empty description' });
    }
    if (!req.body.reason) {
        errors.push({ text: 'Explain why this course?' });
    }
    if (errors.length > 0) {
        res.render('course/add', {
            errors: errors,
            name: req.body.name,
            description: req.body.description,
            reason: req.body.reason
        });
    }
    else {
        let data = {
            CourseName: req.body.name,
            Description: req.body.description,
            Reason: req.body.reason
        }
        new course(data)
            .save()
            .then(course => {
                res.redirect('/course');
            })
            .catch(err => {
                console.log(err);
            });
    }
});

router.put('/', (req, res) => {
    let errors = [];
    if (!req.body.name) {
        errors.push({ text: 'Empty Course Name' });
    }
    if (!req.body.description) {
        errors.push({ text: 'Empty description' });
    }
    if (!req.body.reason) {
        errors.push({ text: 'Explain why this course?' });
    }
    if (errors.length > 0) {
        res.render('course/edit', {
            errors: errors,
            course: {
                CourseName: req.body.name,
                Description: req.body.description,
                Reason: req.body.reason,
                _id: req.body._id
            }
        });
    }
    else {
        course.findById(req.body._id)
            .then(newCourse => {
                newCourse.CourseName = req.body.name;
                newCourse.Description = req.body.description;
                newCourse.Reason = req.body.reason;
                newCourse.save()
                    .then(course => {
                        res.redirect('/course');
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
});

router.delete('/:id', (req, res) => {
    course.findByIdAndDelete(req.params.id)
        .then(done => {
            res.redirect('/course');
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;