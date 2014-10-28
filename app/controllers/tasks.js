'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//var http = require('http');
var request = require('request');
var qs = require('querystring');

exports.send = function(req, res) {
	var timestamp = Math.round(new Date().getTime() / 1000);
	var querystring = {
		_fields: 'date_created, date_due, date_completed, status, assignee(email)', 
		_filters: 'date_due_before('+timestamp+'), status(4,6)', 
	    _bearer_token: req.query.access_token
	};
	querystring = qs.stringify(querystring);
	request({
	    method: 'GET',
	    headers: {
	        'Content-length': querystring.length,
	        'Content-type': 'application/x-www-form-urlencoded'
	    },
	    uri: 'https://demo.api.staging.affinitylive.com/api/v0/tasks.json',
	    body: querystring
	}, function(error, response, body){
	    if(response.statusCode === 200){
	        var content = JSON.parse(body);
	        res.send(content.response);
	    }else{
	    	res.send('error:'+response.statusCode);
	    }
	});
};

exports.update = function(req, res) {
	var querystring = { 
	    _bearer_token: req.query.access_token
	};
	querystring = qs.stringify(querystring);
	request({
	    method: 'PUT',
	    headers: {
	        'Content-length': querystring.length,
	        'Content-type': 'application/x-www-form-urlencoded'
	    },
	    uri: 'https://demo.api.staging.affinitylive.com/api/v0/tasks/'+String(req.query.taskid)+'/progressions/'+String(req.query.state),
	    body: querystring
	}, function(error, response, body){
	    if(response.statusCode === 200){
	        var content = JSON.parse(body);
	        console.log(content);
	        res.send(content.response);
	    }else{
	    	console.log('body:'+body);
	    	res.send('error:'+response.statusCode);
	    }
	});
};