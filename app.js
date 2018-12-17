const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

require('./connection');
const course = require('./models/CourseIdea');

//body-parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

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
    res.render('course/edit');
});

app.get('/course', (req, res) => {
    course.find()
        .sort({date: 'desc'})
        .then(data=>{
            res.render('course/index',{data: data});
        })
        .catch(err=>{
            console.log(err);
        });
    
});

app.post('/course', (req, res) => {
    let errors = [];
    if(!req.body.name){
        errors.push({text: 'Empty Course Name'});
    }
    if(!req.body.description){
        errors.push({text: 'Empty Course Name'});
    }
    if(!req.body.reason){
        errors.push({text: 'Empty Course Name'});
    }
    if(errors.length > 0){
        res.render('course/add',{
            errors: errors,
            name: req.body.name,
            description: req.body.description,
            reason: req.body.reason
        });
    }
    else{
        let data = {
            CourseName: req.body.name,
            Description: req.body.description,
            Reason: req.body.reason
        }
        new course(data)
            .save()
            .then(course=>{
                res.redirect('/course');
            })
            .catch(err=>{
                console.log(err);
            });
    }
})

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});
