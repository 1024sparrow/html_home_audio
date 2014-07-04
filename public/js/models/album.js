var app = app || {};

app.Album = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
        a_name: '',
        tag: ''
    }
});
