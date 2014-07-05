var app = app || {};

app.AlbumView = Backbone.View.extend({
    el: '#main-section',

    render: function(artist, tag, genre, albumList) {
        this.$el.html(renderTemplate('albums', {artist: artist, tag: tag, genre: genre, albums: albumList}));
    },

    initialize: function(options) {
        this.collection = new app.AlbumList(options);
        var self = this;
        this.collection.fetch({success: function(collection, response, options) {
            var albums = [];
            collection.sorted().forEach(function(item) {
               albums.push({a_name: item.get('a_name'), tag: item.get('tag')});
            });
            self.render(collection.artist, collection.tag, collection.genre, albums);
        }});
    }
});
