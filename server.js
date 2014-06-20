var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var multer = require("multer");

var app = express();

mongoose.connect('mongodb://localhost/test_audio');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(methodOverride());
app.use(multer({
    dest: "./public/audio/"
}));

require('./routes/artist')(app);
require('./routes/genre')(app);
require('./routes/upload')(app);

var populate_genres = require('./data/utility/pop_genres');
populate_genres();

app.listen(3000);
console.log('App listening on 3000 and you can too!');
