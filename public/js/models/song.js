var app = app || {};

app.Song = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
        name: '',
        filename: '',
        number: 0
    }
});
