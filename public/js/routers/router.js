var app = app || {};

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'mainPage',
        'upload': 'uploadForm',
        'artists': 'artistsPage',
        'artists/:artist': 'albumsPage'
    },

    mainPage: function() {
        app.Application.trigger('main');
    },

    uploadForm: function() {
        app.Application.trigger('upload');
    },

    artistsPage: function() {
        app.Application.trigger('artists');
    },

    albumsPage: function(artist) {
        console.log(artist);
        app.Application.trigger('albums', artist);
    }

});

app.AppRouter = new AppRouter();
Backbone.history.start();
