var app = app || {};

app.SongView = Backbone.View.extend({
    el: '#main-section',

    render: function(data) {
        this.$el.html(renderTemplate('songs', data));
    },

    initialize: function(options) {
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
        }});
    }
});
