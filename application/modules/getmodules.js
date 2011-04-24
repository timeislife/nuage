var nuage = require('nuage');

exports.loginRequired = function() {
    return true;
}

exports.execute = function(request, response) {
    nuage.json.load(__dirname + '/config/config.json', function(config) {
        response.writeHead(200);
        response.end(JSON.stringify(config));
    });
}

exports.executeDefault = function(request, response) {
    response.end('false');
}