/**
 * Created by Dylan on 2015-06-05.
 */

// Modules
var app = angular.module("app",
  [
    'Main',
    'ColorRank'
  ]);

// Routing
app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: '/views/colorRank.html',
        controller: 'ColorRankCtrl'
      })
      .otherwise({ redirectTo: '/' });

    $locationProvider.html5mode(true);
  }]);
