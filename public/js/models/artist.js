var app = app || {};

app.Artist = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
        name: '',
        tag: ''
    }
});
