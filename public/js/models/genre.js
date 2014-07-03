var app = app || {};

app.Genre = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
        name: ''
    }
});