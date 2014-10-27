'use strict';

angular.module('mean.system').controller('WorkSpaceController', ['$scope', '$state', '$http', '$location', '$stateParams', '$cookieStore', 
    function ($scope, $state, $http, $location, $stateParams, $cookieStore) {
        $scope.login_info = $cookieStore.get('login_info');

        $scope.get_overdue_tasks = function(){
            $scope.overdue_tasks = null;
            $http.get('workspace/get_overdue_tasks', {params:{access_token: $scope.login_info.access_token}}).
              success(function(data/*, status, headers, config*/) {
                if (data !== 'error:400') {
                    for ( var i = 0 ; i < data.length ; i++ ) {
                        for (var property in data[i].assignee) {
                            data[i]['assignee_'+property]=data[i].assignee[property];
                        }
                        delete data[i].assignee;
                        if (data[i].date_completed !== '' && data[i].date_completed !== null) {
                            data[i].progression = true;
                        }else{
                            data[i].progression = false;
                        }
                    }
                    $scope.overdue_tasks = data;
                }else{
                    alert('Found nothing!');
                }
              }).
              error(function(/*data, status, headers, config*/) {
                alert('The resources requested do not exist!');
              });
        };

        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'home';
            return page === currentRoute ? 'active' : '';
        };

        $scope.updateProgression = function (task) {
            $http.get('workspace/updateProgression', {
                params:{
                    access_token: $scope.login_info.access_token, 
                    state: task.progression ? 'start' : 'done', 
                    taskid: task.id
                }
            }).
            success(
                function(/*data, status, headers, config*/) {
                    $scope.get_overdue_tasks();
                }).
            error(
                function(/*data, status, headers, config*/) {
                    alert('The resources requested do not exist!');
            });
        };
}]);

angular.module('mean.system').filter('stateTotext', 
    function() {
        return function(input) {
            return input ? 'Start' : 'Done';
        };
    }
);