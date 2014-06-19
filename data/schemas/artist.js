var mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({
  name: String,
  genre: String,
  tag: String,
  albums: [{
    a_name: String,
    tag: String,
    songs : [{
      s_name: String,
      filename: String
    }]
  }]
});

module.exports = ArtistSchema;
 
