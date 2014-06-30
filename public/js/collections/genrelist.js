var app = app || {};

app.GenreList = Backbone.Collection.extend({
    model: app.Genre,

    url: '/upload',

    parse: function(data) {
        console.log(data.data);
        return data.data;
    }
});
