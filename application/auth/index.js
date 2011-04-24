var nuage = require ('nuage');

exports.loginRequired = function() {
    return true;
}

exports.execute = function(request, response) {
    response.writeHead(
        302,
        {
            Location: '/admin'
        }
    );
    response.end();
}

exports.executeDefault = function(request, response) {
    response.end(nuage.template.render(__dirname + '/templates/login.html', {
        'baseurl': nuage.getBaseUrl()
    }));
}

