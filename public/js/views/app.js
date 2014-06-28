var app = app || {};

app.AppView = Backbone.View.extend({

    el: '#container',

    headerTmpl: renderTemplate('header', {}),

    welcomeTmpl: renderTemplate('welcome', {}),

    events: {
        'click #artists': 'artistPage',
        'click #genres': 'genresPage',
        'click #upload': 'uploadPage'
    },

    initialize: function(){
        console.log('initialize appview');
        console.log(this.headerTmpl);
        this.$header = this.$('#main-header');
        this.$mainSection = this.$('#main-section');
        this.render();
    },

    render: function(){
        console.log(this.headerTmpl);
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
        console.log('upload');
    }

});