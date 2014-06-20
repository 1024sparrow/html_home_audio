var Genre = require('../models/genre');

function populate_genres() {
    Genre.find({}, function(err, genres) {
        if(err) {
            console.log(err);
        }
        if(!genres.length) {
            var genre_list = ["Rock", "Folk", "Jazz", "Classical", "Metal",
                "Indie", "Country", "Electronic", "Blues", "Pop", "Funk"];
            for (var i=0; i < genre_list.length; i++) {
                var genre = new Genre({genre: genre_list[i]});
                genre.save(function (err) {
                    if (err) {
                        console.log("save error: " + err);
                    }
                });
            }
        }
    });
}

module.exports = populate_genres;

