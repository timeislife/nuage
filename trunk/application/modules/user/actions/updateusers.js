var nuage = require('nuage');
var cradle = require('cradle');

exports.loginRequired = function() {
    return true;
}

exports.execute = function(request, response, data) {
    var newContent = JSON.parse(data.post.users);
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

        database.get(config.documents.users, function(error, document) {
            if (error) {
                response.end('Error document '+config.documents.users+' not found');
            } else {
                database.save(config.documents.users, document._rev, {users: newContent}, function(error, result) {
                    if (error) {
                        response.end(error);
                    } else {
                         response.end('true');
                    }
                });
            }
        });
    });
}

exports.executeDefault = function(request, response) {
    response.end('false');
}