var Artist =  require('../data/models/artist');
var Genre = require('../data/models/genre');

module.exports = function(app) {

    app.get('/genres', function(req, res) {
        var genre_list = [];
        Genre.find({}, function(err, genres) {
            if(err) {
                console.log(err);
            }
            genres.forEach(function(genre) {
                genre_list.push(genre.genre);
            });
            genre_list.sort();
            var record = {};
            genre_list.forEach(function(genre) {
                record[genre] = [];
            });
            Artist.find({}, function(err, artists) {
                if(err) {
                    console.log(err);
                }
                artists.forEach(function(artist) {
                    record[artist.genre].push({name: artist.name, tag: artist.tag});
                });
                for (var key in record) {
                    record[key].sort();
                }
                res.end(JSON.stringify(record));
            });
        });
    });
}
