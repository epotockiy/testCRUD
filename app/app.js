'use strict';

var app = angular.module('testCrudApp', ['ngRoute']) //,'ui.router'
    .config(function($routeProvider) {
        $routeProvider
        	.when('/',{
        		templateUrl: 'templates/home.html',
        		controller: 'MainCtrl'
        	})
            .when('/posts/:id', {
                templateUrl: '/templates/post.html',
                controller: 'PostCommentCtrl'

            })
            .otherwise({
                redirectTo: '/'
            });
    });
