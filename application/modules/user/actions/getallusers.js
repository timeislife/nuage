var nuage = require('nuage');
var cradle = require('cradle');

exports.loginRequired = function() {
    return true;
}

exports.execute = function(request, response) {
    response.end(nuage.template.render(
        __dirname + '/templates/index.html',
        {
            title: 'Administration',
            username: ''
        }
    ));
}

exports.executeDefault = function(request, response) {
    response.end('false');
}