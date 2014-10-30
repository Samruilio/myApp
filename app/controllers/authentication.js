'use strict';

var path = require('path');

exports.send = function(req, res) {
	if (req.query.code !== null) {
		res.status(302).send('<script>window.close();</script>');
		//res.sendFile('overview.html', { root: path.join(__dirname, '../../public/views') });
	}else{
		var auth = require('../models/authen');
		auth.getToken(req.query.username, req.query.password, function(data){
			res.send(data);
		});
	}
};
