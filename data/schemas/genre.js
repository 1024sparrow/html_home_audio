var mongoose = require('mongoose');

var GenreSchema = new mongoose.Schema({
    genre: String
});

module.exports = GenreSchema;