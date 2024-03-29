/*
 *  Nuage - Framework for Nodejs
 *
 *  Copyright (c) 2011 Stephan Bruny
 *
 *  This software is provided 'as-is', without any express or implied warranty.
 *  In no event will the authors be held liable for any damages arising from the use of this software.
 *
 *  Permission is granted to anyone to use this software for any purpose,
 *  including commercial applications, and to alter it and redistribute it freely,
 *  subject to the following restrictions:
 *
 *      The origin of this software must not be misrepresented;
 *      you must not claim that you wrote the original software.
 *      If you use this software in a product,
 *      an acknowledgment in the product documentation would be appreciated but is not required.
 *      Altered source versions must be plainly marked as such,
 *      and must not be misrepresented as being the original software.
 *      This notice may not be removed or altered from any source distribution.
 *
 */

var modUrl = require('url');

/**
 * decodeUrl
 *
 * @param url Url to decode
 *
 * @return object
 */
exports.decodeUrl = function(url) {
    url = modUrl.parse(url);

    if (url.pathname == '' || url.pathname == '/') {
        return {
            'base': '/',
            'params': {}
        }
    }

    var base   = url.pathname.match(/\w+/);
    url.pathname.replace(/\w+/, '');
    var params = url.pathname.match(/(\w+)/g);

    return {
        'base': base,
        'params': params
    }

    return false;
}

/**
 * resolveUrl
 *
 * @param url    Url to resolve
 * @param config configuration object
 *
 * @return object
 */
exports.resolveUrl = function(url, config) {
    url = modUrl.parse(url);

    var params = url.pathname.match(/(\w+)/g);

    if (config !== undefined) {
        for (route in config) {
            regexp = new RegExp(config[route].pattern);

            if (regexp.exec(url.pathname) != null) {
                return {
                    'base'  : config[route],
                    'action': config[route].action,
                    'params': params
                }
            }
        }
    } else {
        throw {message: 'Invalid routing configuration given'};
    }
}


