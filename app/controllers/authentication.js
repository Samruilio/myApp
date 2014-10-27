'use strict';

exports.send = function(req, res) {
	var auth = require('../models/authen');
	auth.getToken(req.query.username, req.query.password, function(data){
		res.send(data);
	});
};
