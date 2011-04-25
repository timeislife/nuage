var nuage = require('nuage');

exports.loginRequired = function() {
    return true;
}

exports.sanity = function() {
    return [
        {
            'name': 'module',
            'required': true,
            'regexp': /^\w+$/
        },
        {
            'name': 'action',
            'required': true,
            'regexp': /^\w+$/
        }
    ];

}

exports.execute = function(request, response, data, user) {
    var url = require('url').parse(request.url);
    var params = require('querystring').parse(url.query);
    var module = params.module;
    var action = params.action;
    nuage.json.load(__dirname + '/config/config.json', function(config) {
        // TODO Input validation / sanity
        for (var i = 0; i < config.modules.length; i++) {
            if (config.modules[i].name == module) {
                for (var j = 0; j < config.modules[i].actions.length; j++) {
                    if (config.modules[i].actions[j].name == action) {
                         var path = __dirname + '/' + 
                             module + '/' +
                             config.modules[i].actions[j].action + '.js';
                         nuage.executeAction(path, request, response, data, user);
                         return;
                    }
                }
                response.writeHead(404);
                response.end('Unknown action "' + action + '"');
            }
        }
        response.writeHead(404);
        response.end('Unknown Module "' + action + '"');
    });

}

exports.executeDefault = function(request, response) {
    response.end('false');
}