var app = app || {};

app.SongView = Backbone.View.extend({
    el: '#main-section',

    render: function(data) {
        this.$el.html(renderTemplate('songs', data));
    },

    events: {
        'click #back': 'previousSong',
        'click #play-pause': 'playPause',
        'click #next': 'nextSong'
    },

    initialize: function(options) {
        this.currentSong = 1;
        this.firstPlay = true;
        this.collection = new app.SongList(options);
        var self = this;
        this.collection.fetch({success: function(collection, response, options) {
            var songs = [];
            collection.sorted().forEach(function(item) {
                songs.push({name: item.get('name'), number: item.get('number'), filename: item.get('filename')});
            });
            self.render({
                artist: collection.artist,
                tag: collection.tag,
                album: collection.album,
                songs: songs
            });
            var track = collection.getSongInfo(self.currentSong);
            self.setSongSource(track.name, track.filename);
            self.audio = document.getElementById('audio');
            self.audio.addEventListener('ended', self.nextSong); // change rendering and move this out of the fetch
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
            // seek back to start of the song
        }
    },

    nextSong: function() {
        if(this.currentSong == this.collection.models.length) {
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

    setSongSource: function(name, filename) {
        var audioPlayer = $('#audio');
        audioPlayer.empty();
        audioPlayer.append(renderTemplate('source', {filename: filename}));
        document.getElementById('now-playing').textContent = name;
    }
});
