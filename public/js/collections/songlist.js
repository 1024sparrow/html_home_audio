var app = app || {};

app.SongList = Backbone.Collection.extend({
    model: app.Song,

    url: '',

    initialize: function(options) {
        this.url = '/artists/' + options.artist + '/' + options.album;
    },

    sorted: function() {
        return this.models.sort(function(value1, value2) {
            if(value1.get('number') < value2.get('number')) { return -1; }
            if(value1.get('number') > value2.get('number')) { return 1; }
            else { return 0; }
        });
    },

    parse: function(data) {
        this.artist = data.name;
        this.tag = data.tag;
        this.album = data.a_name;
        this.a_tag = data.a_tag;
        return data.songs;
    }
});
