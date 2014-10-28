'use strict';

exports.send = function(req, res) {
	if (req.query.code !== null) {
		res.render('index', {user: 'Your security code is '+req.query.code});
	}else{
		var auth = require('../models/authen');
		auth.getToken(req.query.username, req.query.password, function(data){
			res.send(data);
		});
	}
};
