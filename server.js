'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./config/config');
var db     = mongoose.connect(config.db);

//Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js|coffee)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

var app = express();

//express settings
require('./config/express')(app, db);

//Bootstrap routes
require('./config/routes')(app);

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//Start the app by listening on <port>
var port = config.port;
//app.listen(port);
http.listen(port);
console.log('Express app started on port ' + port);

//expose app
exports = module.exports = app;
