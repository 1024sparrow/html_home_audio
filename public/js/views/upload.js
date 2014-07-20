var app = app || {};

app.UploadView = Backbone.View.extend({

    render: function(genreList) {
        this.$el.html(renderTemplate('upload', {genres: genreList}));
    },

    initialize: function() {
        this.collection = new app.GenreList();
        var self = this;
        this.collection.fetch({success: function(collection, response, options) {
            var genres = [];
            collection.forEach(function(item) {
                genres.push(item.get('name'));
            });
            genres.sort();
            self.render(genres);
        }});
    }
});