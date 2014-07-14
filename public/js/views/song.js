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
            self.setSongSource(track.filename);
        }});
    },

    previousSong: function() {
        console.log("previous");
    },

    nextSong: function() {
        console.log("next");
    },

    playPause: function() {
        console.log("play pause");
    },

    setSongSource: function(filename) {
        $('#audio').append(renderTemplate('source', {filename: filename}));
    }
});
