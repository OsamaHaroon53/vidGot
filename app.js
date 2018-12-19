const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
require('./connection');
const course = require('./routes/course');

const app = express();
const port = 3000;

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//method override for put and delete
app.use(methodOverride('_method'));

// flash messages
app.use(flash());

// express session
app.use(session({
    secret: 'osama',
    resave: true,
    saveUninitialized: true,
}));

// create variables for flash messages
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

//routes
app.use('/course', course);

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});
