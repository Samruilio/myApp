process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var http = require("http");
var request = require("request");
var qs = require("querystring");

module.exports.getToken = function(name, pass, callback){
    var querystring = {
        client_id: '0a5971f7ce@demo.staging.affinitylive.com',
        client_secret: 'eERGXMo2CMsPtuo1jDkzmp2iPhgjcTth',
        grant_type: 'client_credentials',
        username: name,
        password: pass
    }
    querystring = qs.stringify(querystring);
    request({
        method: 'POST',
        headers: {
            'Content-length': querystring.length,
            'Content-type': 'application/x-www-form-urlencoded'
        },
        uri: 'https://demo.api.staging.affinitylive.com/oauth2/v0/token',
        body: querystring
    }, function(error, response, body){
        if(response.statusCode == 200){
            var content = JSON.parse(body);
            callback(content);
        }else{
            callback('error:'+response.statusCode);
        }
    });
}