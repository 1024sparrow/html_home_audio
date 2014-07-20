var app = app || {};

app.AppView = Backbone.View.extend({

    el: '#container',

    headerTmpl: renderTemplate('header', {}),

    welcomeTmpl: renderTemplate('welcome', {}),

    uploadTmpl: renderTemplate('upload', {}),

    events: {
        'click #genres': 'genresPage'
    },

    initialize: function(){
        this.on('main', this.mainPage);
        this.on('upload', this.uploadPage);
        this.on('artists', this.artistsPage);
        this.on('albums', this.albumsPage);
        this.on('songs', this.songsPage);
        this.$header = this.$('#main-header');
        this.$mainSection = this.$('#main-section');
        this.render();
    },

    render: function(){
        this.$header.html(this.headerTmpl);
        this.$mainSection.html(this.welcomeTmpl);
    },

    artistsPage: function(){
        this.createSubView(new app.ArtistView());
    },

    albumsPage: function(artistName){
        this.createSubView(new app.AlbumView({name: artistName}));
    },

    songsPage: function(artist, album) {
        this.createSubView(new app.SongView({artist: artist, album: album}));
    },

    genresPage: function(){
        console.log('genres');
    },

    uploadPage: function(){
        this.createSubView(new app.UploadView());
    },

    mainPage: function(){
        this.$mainSection.html(this.welcomeTmpl);
    },

    createSubView: function(view) {
        if(this.currentView) {
            this.currentView.remove();
        }
        this.currentView = view;
        $('#main-section').html(this.currentView.el);
    }

});