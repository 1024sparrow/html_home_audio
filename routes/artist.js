var Artist =  require('../data/models/artist');

module.exports = function(app) {

    app.get('/artists', function(req, res) {
        var artist_list = {a: [], b: [], c: [], d: [], e: [], f: [], g: [], h: [], i: [],
                            j: [], k: [], l: [], m: [], n: [], o: [], p: [], q: [], r:{},
                            s: [], t: [], u: [], v: [], w: [], x: [], y: [], z: []};
        Artist.find({}, function(err, artists) {
            if(err) {
                console.log(err);
            }
            artists.sort(function(value1, value2) {
                if(value1.name < value2.name) { return -1; }
                else if(value1.name > value2.name){ return 1; }
                else { return 0; }
            });
            artists.forEach(function(artist) {
                var letter = artist.name.substring(0, 1).toLowerCase();
                var record = {name: artist.name, tag: artist.tag};
                artist_list[letter].push(record);
            });
            res.end(JSON.stringify(artist_list));
        });
    });

    app.get('/artists/:artist', function(req, res) {
        Artist.findOne({tag: req.params.artist}, function(err, artist) {
            if(err) {
                console.log(err);
            }
            if(!artist) {
                res.end("404");
            }
            else {
                var record = {name: artist.name, genre: artist.genre, albums: []};
                artist.albums.forEach(function(album) {
                   var album_record = {a_name: album.a_name, tag: album.tag};
                    record.albums.push(album_record);
                });
                res.end(JSON.stringify(record));
            }
        });
    });

    app.get('/artists/:artist/:album', function(req, res) {
        Artist.findOne({tag: req.params.artist}, function(err, artist) {
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
                        var record = {a_name: album.a_name, tag: album.tag, songs: []};
                        album.songs.sort(function(value1, value2) {
                            if(value1.s_number < value2.s_number) { return -1; }
                            else if(value1.s_number > value2.s_number) { return 1; }
                            else { return 0; }
                        });
                        album.songs.forEach(function(song) {
                            record.songs.push({s_number: song.s_number, s_name: song.s_name, filename: song.filename});
                        });
                        res.end(JSON.stringify(record));
                        break;
                    }
                }
            }
        });
    });
}