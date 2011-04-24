var nuage = require('nuage');

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
    response.writeHead(
        302,
        {
            Location: '/login'
        }
    );
    response.end();
}