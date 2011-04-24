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

var _events = new Array();

exports.addEvent = function(event) {
    _events.push({
        name: event,
        listeners: new Array()
    });
}

exports.register = function(eventName, callback) {
    if (typeof event !== 'string') {
        throw {message: 'Invalid event name'};
    }

    if (typeof callback !== 'function') {
        throw {message: 'Callback is not a function'};
    }

    if (undefined === _events[eventName]) {
        throw {message: 'Unknown event "' + eventName+'"'};
    }

    for (event in _events) {
        if (_events[event].name === eventName) {
            _events[event].listeners.push(callback);
        }
    }
}

// TODO: Unregister

exports.fireEvent = function(eventName, params) {
    if (undefined === _events[event]) {
        throw {message: 'Unknown event "' + event+'"'};
    }
    
     for (event in _events) {
        if (_events[event].name === eventName) {
            var listeners = _events[event].listeners;
            for (listener in listeners) {
                listeners[listener](params);
            }
        }
     }
}