// And this is the definition of the custom function
function renderTemplate(tmpl_name, tmpl_data) {
    if ( !renderTemplate.tmpl_cache ) {
        renderTemplate.tmpl_cache = {};
    }

    if ( ! renderTemplate.tmpl_cache[tmpl_name] ) {
        var tmpl_dir = '/html';
        var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

        var tmpl_string;
        $.ajax({
            url: tmpl_url,
            method: 'GET',
            async: false,
            success: function(data) {
                tmpl_string = data;
            }
        });

        renderTemplate.tmpl_cache[tmpl_name] = Handlebars.compile(tmpl_string);
    }

    return renderTemplate.tmpl_cache[tmpl_name](tmpl_data);
}
