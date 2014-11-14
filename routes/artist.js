var Artist =  require('../data/models/artist');
var Q = require('q');  // Promise library

// wrap callback style functions to return a promise
var findArtist = Q.denodeify(Artist.find);
var findOneArtist = Q.denodeify(Artist.findOne);

module.exports = function(app) {

    app.get('/artists', function(req, res) {
        var promise = findArtist({sort: {name: 1}});
        promise.then(processArtists, processError);
        /*Artist.find({}, function(err, artists) {
            if(err) {
                console.log(err);
            }
            artists.sort(function(value1, value2) {
                if(value1.name < value2.name) { return -1; }
                else if(value1.name > value2.name){ return 1; }
                else { return 0; }
            });
            artists.forEach(function(artist) {
                var record = {name: artist.name, tag: artist.tag, _id: artist._id};
                artist_list.push(record);
            });
            res.end(JSON.stringify(artist_list));
        }); */
    });

    app.get('/artists/:artist', function(req, res) {
        var promise = findOneArtist({tag: req.params.artist});
        promise.then(processAlbums, processError);
        /*Artist.findOne({tag: req.params.artist}, function(err, artist) {
            if(err) {
                console.log(err);
            }
            if(!artist) {
                res.end("404");
            }
            else {
                var record = {name: artist.name, tag: artist.tag, genre: artist.genre, albums: []};
                artist.albums.forEach(function(album) {
                   var album_record = {a_name: album.a_name, tag: album.tag};
                    record.albums.push(album_record);
                });
                res.end(JSON.stringify(record));
            }
        });*/
    });

    app.get('/artists/:artist/:album', function(req, res) {
        var promise = findOneArtist({tag: req.param.artist});
        promise.then(processSongs, processError);
        /*Artist.findOne({tag: req.params.artist}, function(err, artist) {
            if(err) {
                console.log(err);
            }
            if(!artist) {
                res.end("404");
            }
            else {
                for(var i=0; i < artist.albums.length; i++) {
                    var album = artist.albums[i];
                    if(album.tag == req.params.album) {
                        var record = {name: artist.name, tag: artist.tag, a_name: album.a_name, a_tag: album.tag, songs: []};
                        album.songs.forEach(function(song) {
                            record.songs.push({number: song.s_number, name: song.s_name, filename: song.filename});
                        });
                        res.end(JSON.stringify(record));
                        break;
                    }
                }
            }
        });*/
    });
};

// promise fulfillment/rejection functions not exported
function processArtists(artists) {
    var artist_list = [];
    artists.forEach(function(artist) {
        var record = {name: artist.name, tag: artist.tag, _id: artist._id};
        artist_list.push(record);
    });
    res.end(JSON.stringify(artist_list));
}

function processAlbums(artist) {
    if(!artist) {
        res.end("404");
    }
    else {
        var record = {name: artist.name, tag: artist.tag, genre: artist.genre, albums: []};
        artist.albums.forEach(function(album) {
            var album_record = {a_name: album.a_name, tag: album.tag};
            record.albums.push(album_record);
        });
        res.end(JSON.stringify(record));
    }
}

function processSongs(artist) {
    if(!artist) {
        res.end("404");
    }
    else {
        for(var i=0; i < artist.albums.length; i++) {
            var album = artist.albums[i];
            if(album.tag == req.params.album) {
                var record = {name: artist.name, tag: artist.tag, a_name: album.a_name, a_tag: album.tag, songs: []};
                album.songs.forEach(function(song) {
                    record.songs.push({number: song.s_number, name: song.s_name, filename: song.filename});
                });
                return res.end(JSON.stringify(record));
            }
        }
        res.end("404"); // album not found
    }
}

function processError(err) {
    console.log(err);
}