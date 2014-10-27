'use strict';

var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    //db: process.env.MONGOHQ_URL,
    db: 'mongodb://heroku:d86d1548d9e80069b8b921fee998f3da@linus.mongohq.com:10069/app31039692',

    // Template Engine
    templateEngine: 'jade',

    // The secret should be set to a non-guessable string that
  	// is used to compute a session hash
  	sessionSecret: 'MEAN',
  	// The name of the MongoDB collection to store sessions in
  	sessionCollection: 'sessions'
}
