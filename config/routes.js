var async = require('async');

module.exports = function(app) {

    //Home route
    var login = require('../app/controllers/login');
    var auth = require('../app/controllers/authentication');
    var tasks = require('../app/controllers/tasks');
    app.get('/', login.render);
    app.get('/auth', auth.send);
    app.get('/workspace/get_overdue_tasks', tasks.send);
    app.get('/workspace/updateProgression', tasks.update);
};