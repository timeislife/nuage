var nuage = require('nuage');

exports.loginRequired = function() {
    return true;
}

exports.execute = function(request, response, data, user) {
    var url = require('url').parse(request.url);
    var params = require('querystring').parse(url.query);
    var module = params.module;
    var action = params.action;

    // TODO Input validation / sanity

    var path = __dirname + '/' + module + '/' + action + '.js';

    nuage.executeAction(path, request, response, data, user);
}

exports.executeDefault = function(request, response) {
    response.end('false');
}