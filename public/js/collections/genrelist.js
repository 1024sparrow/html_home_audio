var app = app || {};

app.GenreList = Backbone.Collection.extend({
    model: app.Genre,

    url: '/upload',

    parse: function(data) {
        return data.data;
    }
});
