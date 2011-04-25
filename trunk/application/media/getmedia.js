var nuage = require('nuage');

var fs = require('fs');

var path = require('path');

exports.loginRequired = function() {
    return false;
}

exports.execute = function(request, response) {
    var route = nuage.getRoute(request.url);

    // create file path from route parameters
    var fileName = route.url.href;

    if (null == fileName.match(/\w+(\/\w+)*\.\w+/)) {
        response.writeHead(404);
        response.end('media not found');
        return;
    }

    nuage.json.load(__dirname + '/config/config.json', function(config){
        var dir      = config.directory;
        var filePath = dir + fileName.replace(config.htdocs, '');
        console.log(filePath);
        path.exists(filePath, function(exists) {
            if (exists) {
                fs.readFile(filePath, 'binary', function(error, data) {
                    if (error) {
                        console.log(error); // TODO: Use Nuage
                    } else {
                        response.writeHead(200);
                        response.write(data, 'binary');
                        response.end();
                    }
                })
            } else {
                response.end('media not found');
            }
        });
    });

}