var app = app || {};

app.ArtistList = Backbone.Collection.extend({
    model: app.Artist,

    url: '/artists',

    sorted: function() {
        return this.models.sort(function(value1, value2) {
            if(value1.name < value2.name) { return -1; }
            else if(value1.name > value2.name) { return 1; }
            else { return 0;}
        });
    }
});
