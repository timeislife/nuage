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

/*
 * Routing handler
 */
var routing = require('./libs/routing.js');

/*
 * Hot loading modules (dynamic caching)
 */
var hotload = require('./libs/hotload.js');

/*
 * JSON File handling
 */
var json = require('./libs/json.js');

/*
 * Event Dispatcher
 */
var dispatcher = require('./libs/dispatcher.js');

/*
 * Template Engine
 */
var template = require('./libs/template.js');

var http = require('http');

var fs = require('fs');

const LOG_NOTHING = 0;
const LOG_CONSOLE = 1;
const LOG_LOGFILE = 2;

var logLevel = 1;

var logFile = '/tmp/nuage.log';

var writeLog = function(info) {
    if (logLevel === LOG_CONSOLE) {
        console.log(info);
    }

    if (logLevel === LOG_LOGFILE) {
        fs.writeFile(logFile, info, function (err) {
          if (err) {
              console.log(err);
          }
        });
    }
}

/**
 * createServer
 *
 * creates a new Nuage - Server
 *
 * @param configFile Path to JSON-File with configuration
 *
 * @return void
 */
exports.createServer = function(configFile) {
    json.load(configFile, function(config){

        var adresse = config.server.adresse;
        var port    = config.server.port;
        var logFile = (config.server.logfile !== undefined) ?
            config.server.logfile : logFile;

        http.createServer(function (request, response) {
            var route = routing.decodeUrl(request.url, config.routes);

            var action = require(config.directories.application + route.action);

            action.execute(request, response);

        }).listen(port, adresse);
    });
}

exports.setLogLevel = function(level) {
    logLevel = level;
}

exports.setLogFile = function(filename) {
    logFile = filename;
}

exports.json = json;
exports.routing = routing;
exports.hotload = hotload;
exports.dispatcher = dispatcher;
exports.template = template;