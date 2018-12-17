const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

require('./connection');
const course = require('./models/CourseIdea');

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//method override for put and delete
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/course/add', (req, res) => {
    res.render('course/add');
});

app.get('/course/edit/:id', (req, res) => {
    course.findOne({ _id: req.params.id })
        .then(data => {
            res.render('course/edit', { course: data });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/course', (req, res) => {
    course.find()
        .sort({ date: 'desc' })
        .then(data => {
            res.render('course/index', { data: data });
        })
        .catch(err => {
            console.log(err);
        });

});

app.post('/course', (req, res) => {
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

app.put('/course', (req, res) => {
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

app.delete('/course/:id',(req,res)=>{
    course.findByIdAndDelete(req.params.id)
        .then(done=>{
            res.redirect('/course');
        })
        .catch(err=>{
            console.log(err);
        });
});

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});
