'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider.state('login', {
      url: '/',
      templateUrl: 'views/login.html'
    }).state('workspace', {
      url: '/workspace',
      templateUrl: 'views/workspace.html'
    }).state('workspace.overview', {
      url: '/overview',
      templateUrl: 'views/overview.html'
    }).state('workspace.overduetasks', {
      url: '/overduetasks',
      templateUrl: 'views/overduetasks.html'
    }).state('workspace.connectyammer', {
      url: '/connectyammer',
      templateUrl: 'views/connectyammer.html'
    }).state('workspace.chatty', {
      url: '/chatty',
      templateUrl: 'views/chatty.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);