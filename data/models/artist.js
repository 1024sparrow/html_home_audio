var mongoose = require('mongoose');
var ArtistSchema = require('../schemas/artist');

var Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
