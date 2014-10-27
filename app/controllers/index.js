'use strict';

exports.render = function(req, res) {
	var auth = require('../models/authen');
	auth.getToken(function(token){
		res.render('index', {
		    user: req.user ? JSON.stringify(req.user) : token
		});
	});
};
