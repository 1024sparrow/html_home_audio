var app = app || {};

var AppRouter = Backbone.Router.extend({
    routes: {
        'upload': 'uploadForm'
    },

    uploadForm: function() {
        app.Application.trigger('upload');
    }
});

app.AppRouter = new AppRouter();
Backbone.history.start();
