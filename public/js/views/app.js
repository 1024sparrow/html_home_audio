var app = app || {};

app.AppView = Backbone.View.extend({

    el: '#container',

    headerTmpl: renderTemplate('header', {}),

    welcomeTmpl: renderTemplate('welcome', {}),

    uploadTmpl: renderTemplate('upload', {}),

    events: {
        'click #artists': 'artistPage',
        'click #genres': 'genresPage'
    },

    initialize: function(){
        this.on('upload', this.uploadPage);
        this.on('main', this.mainPage);
        this.$header = this.$('#main-header');
        this.$mainSection = this.$('#main-section');
        this.render();
    },

    render: function(){
        this.$header.html(this.headerTmpl);
        this.$mainSection.html(this.welcomeTmpl);
    },

    artistPage: function(){
        console.log('artists');
    },

    genresPage: function(){
        console.log('genres');
    },

    uploadPage: function(){
        this.uploadView = new app.UploadView();
    },

    mainPage: function(){
        this.$mainSection.html(this.welcomeTmpl);
    }

});