var nuage = require('nuage');
var cradle = require('cradle');

exports.loginRequired = function() {
    return true;
}

exports.execute = function(request, response) {
    var dbConfig = nuage.getDatabaseConfig();

    var database = new cradle.Connection(
        dbConfig.host,
        dbConfig.port,
        {
            auth: {
                username: dbConfig.username,
                password: dbConfig.password
            }
        }
    ).database(dbConfig.name);

    database.get('administration.users', function(error, document) {
        if (error) {
            response.end('Error document administration.users not found');
        } else {
            response.end(nuage.template.render(
                __dirname + '/../templates/index.html',
                {
                    title: 'Benutzerverwaltung',
                    users: document.users
                }
            ));
        }
    });
}

exports.executeDefault = function(request, response) {
    response.end('false');
}