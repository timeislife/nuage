var nuage = require('nuage');
var cradle = require('cradle');

exports.loginRequired = function() {
    return true;
}

exports.execute = function(request, response) {
    nuage.json.load(__dirname + '/../config/config.json', function(config) {
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

        database.get(config.documents.roles, function(error, document) {
            if (error) {
                response.end('Error document administration.users not found');
            } else {
                response.end(JSON.stringify(document));
            }
        });
    });
}

exports.executeDefault = function(request, response) {
    response.end('false');
}