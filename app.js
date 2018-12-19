const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
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
