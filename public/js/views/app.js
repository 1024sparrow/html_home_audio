var app = app || {};

app.AppView = Backbone.View.extend({

    el: '#container',

    headerTmpl: renderTemplate('header', {}),

    events: {
        'click #artists': 'artistPage',
        'click #genres': 'genresPage',
        'click #upload': 'uploadPage'
    },

    initialize: function(){
        console.log('initialize appview');
        console.log(this.headerTmpl);
        this.$header = this.$('#main-header');
        this.render();
    },

    render: function(){
        console.log(this.headerTmpl);
        this.$header.html(this.headerTmpl);
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