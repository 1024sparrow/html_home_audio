var app = app || {};

app.SongView = Backbone.View.extend({

    render: function() {
        this.$el.html(renderTemplate('audio', {}));
    },

    events: {
        'click #back': 'previousSong',
        'click #play-pause': 'playPause',
        'click #next': 'nextSong'
    },

    initialize: function(options) {
        this.currentSong = 1;
        this.firstPlay = true;
        this.render();
        this.collection = new app.SongList(options);
        var self = this;
        this.collection.fetch({success: function(collection, response, options) {
            var songs = [];
            collection.sorted().forEach(function(item) {
                songs.push({name: item.get('name'), number: item.get('number'), filename: item.get('filename')});
            });
            $('#song-list').html(renderTemplate('songs', {
                artist: collection.artist,
                tag: collection.tag,
                album: collection.album,
                songs: songs
            }));
            self.albumLength = collection.models.length;
            self.audio = document.getElementById('audio');
            var track = collection.getSongInfo(self.currentSong);
            self.setSongSource(track.name, track.filename);
            $('#audio').on('ended', function() { self.songEnded(); });
        }});
    },

    previousSong: function() {
        if(this.currentSong > 1) {
            this.currentSong--;
            if(this.audio.paused) {
                var track = this.collection.getSongInfo(this.currentSong);
                this.setSongSource(track.name, track.filename);
            }
            else {
                this.audio.pause();
                var track = this.collection.getSongInfo(this.currentSong);
                this.setSongSource(track.name, track.filename);
                this.audio.play();
            }
        }
        else {
            this.audio.currentTime = 0;
        }
    },

    nextSong: function() {
        if(this.currentSong == this.albumLength) {
            this.currentSong = 1;
            this.audio.pause();
        }
        else { this.currentSong++; }
        if(this.audio.paused) {
            var track = this.collection.getSongInfo(this.currentSong);
            this.setSongSource(track.name, track.filename);
        }
        else {
            this.audio.pause();
            var track = this.collection.getSongInfo(this.currentSong);
            this.setSongSource(track.name, track.filename);
            this.audio.play();
        }
    },

    playPause: function() {
        if(this.firstPlay) {
            this.firstPlay = false;
            document.getElementById('now-playing').style.visibility = 'visible';

        }
        if(this.audio.paused) {
            this.audio.play();
            document.getElementById('play-pause').textContent = 'Pause';
        }
        else {
            this.audio.pause();
            document.getElementById('play-pause').textContent = 'Play';
        }
    },

    songEnded: function() {
        if(this.currentSong == this.albumLength) {
            this.currentSong = 1;
            var track = this.collection.getSongInfo(this.currentSong);
            this.setSongSource(track.name, track.filename);
        }
        else {
            this.currentSong++;
            var track = this.collection.getSongInfo(this.currentSong);
            this.setSongSource(track.name, track.filename);
            this.audio.play();
        }

    },

    setSongSource: function(name, filename) {
        var audioPlayer = $('#audio');
        audioPlayer.empty();
        audioPlayer.append(renderTemplate('source', {filename: filename}));
        document.getElementById('now-playing').textContent = name;
    },

    remove: function() {
        $('#audio').off('ended', this.songEnded);
        Backbone.View.prototype.remove.apply(this, arguments);
    }
});
