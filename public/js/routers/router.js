var app = app || {};

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'mainPage',
        'upload': 'uploadForm',
        'artists': 'artistsPage'
    },

    mainPage: function() {
        app.Application.trigger('main');
    },

    uploadForm: function() {
        app.Application.trigger('upload');
    },

    artistsPage: function() {
        app.Application.trigger('artists');
    }

});

app.AppRouter = new AppRouter();
Backbone.history.start();
