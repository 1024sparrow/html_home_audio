var app = app || {};

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'mainPage',
        'upload': 'uploadForm'
    },

    uploadForm: function() {
        app.Application.trigger('upload');
    },

    mainPage: function() {
        app.Application.trigger('main');
    }
});

app.AppRouter = new AppRouter();
Backbone.history.start();
