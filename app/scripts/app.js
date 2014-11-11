'use strict';

/**
 * @ngdoc overview
 * @name angularTestApp
 * @description
 * # angularTestApp
 *
 * Main module of the application.
 */
var app = angular
  .module('angularTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ]);
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostCtrl'
      })
    .when('/posts/:postId', {
        templateUrl: 'views/post.html',
        controller: 'PostDetailsCtrl'
    })
    .when('register', {
         templateUrl:'views/register.html',
         controller: 'AuthCtrl',
         resolve: {
             user:function(authService){
                 return authService.resolveUser()
             }
         }
    })
    .otherwise({
        redirectTo:'/'
    })

  });
  app.constant('FIREBASE_URL', 'https://blistering-heat-2420.firebaseio.com/');
