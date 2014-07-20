var app = app || {};

app.ArtistView = Backbone.View.extend({

    render: function(artistList) {
        this.$el.html(renderTemplate('artists', {artists: artistList}));
    },

    initialize: function() {
        this.collection = new app.ArtistList();
        var self = this;
        this.collection.fetch({success: function(collection, response, options) {
            var artists = [];
            collection.sorted().forEach(function(item) {
               artists.push({name: item.get('name'), tag: item.get('tag')});
            });
            self.render(artists);
        }});
    }
});
