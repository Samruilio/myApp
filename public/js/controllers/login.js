'use strict';

angular.module('mean.system').controller('LoginController', ['$scope', '$state', '$http', '$location', '$cookieStore', 
	function ($scope, $state, $http, $location, $cookieStore) {
    $scope.username = '';
    $scope.password = '';

    $scope.login = function(){
    	if ($scope.username !== '' && $scope.password !== '') {
    		$http.get($location.path()+'auth', {params:{username: $scope.username, password: $scope.password}}).
    		  success(function(data/*, status, headers, config**/) {
    		  	if (data !== 'error:400') {
    		  		$cookieStore.put('login_info', data);
    		  		$state.go('workspace.overview');
    		  	}else{
    		  		alert('Can not find this account!');
    		  	}
    		  }).
    		  error(function(/*data, status, headers, config*/) {
    		    alert('The resources requested do not exist!');
    		  });
    	}
    };
}]);