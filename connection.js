const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/vidGot', {
    useNewUrlParser: true
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'CONNECTION ERROR :'));
db.once('open', () => {
    console.log('CONNECTION OPENED!!');
    return db;
});