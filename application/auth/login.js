var nuage = require ('nuage');

exports.loginRequired = function() {
    return true;
}

exports.execute = function(request, response, data, user) {
    response.end(JSON.stringify({
        success: true,
        message: "You are a known and valid user!"
    }));
}

exports.executeDefault = function(request, response, data) {
    nuage.session.setUsers(
    [
        {
            'name': 'test',
            'password': 'test'
        }
    ]);
    if (data) {
        var userObject = nuage.session.login(data.loginFormUsername, data.loginFormPassword, 'sha1');
        if (userObject != null) {
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                'Set-Cookie':
                    'HASH=' + userObject.hash + ';' +
                    'Timestamp=' + userObject.timestamp + ';' +
                    'expires=' + new Date(userObject.getExpireDate()).toString() + ';' +
                    //'Domain=' + nuage.getBaseUrl() + ';' +
                    'path=/; httpOnly'
            });
            
            response.end(JSON.stringify({
                success: true,
                user: userObject
            }));
        }
    }
    response.end('false');


}

