var nuage = require('nuage');

exports.loginRequired = function() {
    return false;
}

exports.execute = function(route, response) {
    response.end(nuage.template.render(__dirname + '/templates/index.ejs', {'action':route.action}));
}