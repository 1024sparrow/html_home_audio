var app = app || {};

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'mainPage',
        'upload': 'uploadForm',
        'artists': 'artistsPage',
        'artists/:artist': 'albumsPage',
        'artists/:artist/:album': 'songsPage'
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
        app.Application.trigger('albums', artist);
    },

    songsPage: function(artist, album) {
        app.Application.trigger('songs', artist, album);
    }
});

app.AppRouter = new AppRouter();
Backbone.history.start();
