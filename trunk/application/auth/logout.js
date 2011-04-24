var nuage = require ('nuage');

exports.loginRequired = function() {
    return true;
}

exports.execute = function(request, response, data, user) {
    nuage.session.logout(user.name);
    response.end('true');
}

exports.executeDefault = function(request, response, data) {
    response.end('false');
}

