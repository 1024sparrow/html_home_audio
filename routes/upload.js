var Artist = require('../data/models/artist');
var Genre = require('../data/models/genre');

module.exports = function(app) {

    app.get('/upload', function(req, res) {
        //send list of genres to choose from
        var genre_list = [];
        Genre.find({}, function(err, genres) {
            if(err) {
                console.log(err);
            }
            genres.forEach(function(genre) {
                genre_list.push({name: genre.genre, _id: genre._id});
            });
            res.end(JSON.stringify({data: genre_list}));
        });
    });

    app.post('/upload', function(req, res) {
        var songs = [];
        for (var file in req.files) {
            if (req.files.hasOwnProperty(file)) {
                var filename = req.files[file].originalname.split(".");
                var song = {
                    s_number: parseInt(req.files[file].fieldname),
                    s_name: filename[0].split("-")[1],
                    filename: req.files[file].name
                };
                songs.push(song);
            }
        }

        var album = {
            a_name: req.body.album.trim(),
            tag: req.body.album.trim().replace(/\s+/g, "_").toLowerCase(),
            songs: songs
        };

        Artist.findOne({name: req.body.name}, function(err, artist) {
            if(err) {
                console.log('error: ' + err);
            }
            if(!artist) {
                var new_album = [];
                new_album.push(album);
                var new_artist = new Artist({
                                             name: req.body.name.trim(),
                                             genre: req.body.genre,
                                             tag: req.body.name.trim().replace(/\s+/g, "_").toLowerCase(),
                                             albums: new_album
                                            });
                new_artist.save(function(err) {
                    if(err) {
                        console.log('save error: ' + err);
                    }
                    // send response so we know upload successful
                    res.redirect('/');
                });
            }
            else {
                artist.albums.push(album);
                artist.save(function(err) {
                    if(err) {
                        console.log(err);
                    }
                    // send response so we know upload successful
                    res.redirect('/');
                });
            }
        });
    });
};
