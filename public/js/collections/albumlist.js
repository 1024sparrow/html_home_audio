var app = app || {};

app.AlbumList = Backbone.Collection.extend({
    model: app.Album,

    url: '',

    initialize: function(options) {
        console.log(options.name);
        this.url = '/artists/' + options.name;
        this.on('add', function(album) {
            console.log(album.get('a_name'));
        });
    },

    sorted: function() {
        return this.models.sort(function(value1, value2) {
            if(value1.name < value2.name) { return -1; }
            else if(value1.name > value2.name) { return 1; }
            else { return 0; }
        });
    },

    parse: function(data) {
        this.artist = data.name;
        this.tag = data.tag;
        this.genre = data.genre;
        return data.albums;
    }
});