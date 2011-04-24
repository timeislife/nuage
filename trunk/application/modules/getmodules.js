var nuage = require('nuage');

exports.loginRequired = function() {
    return true;
}

exports.execute = function(request, response) {
    // return module config
}

exports.executeDefault = function(request, response) {
    response.end('false');
}