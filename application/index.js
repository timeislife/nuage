/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

nuage = require('nuage');

var configFile = __dirname + '/../config/config.json';

nuage.createServer(configFile);