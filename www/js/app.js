var greenStreakApp = angular.module('green-streak', ['ionic', 'green-streak.controllers', 'green-streak.services', 'green-streak.directives']);

// setup dependency injection
angular.module('d3', []);
angular.module('green-streak.controllers', []);
angular.module('green-streak.services', []);
angular.module('green-streak.directives', ['d3']);
angular.module('green-streak.configuration', []);

greenStreakApp.config(function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

greenStreakApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}])
//greenStreakApp.config(['$httpProvider', function($httpProvider) {
//    $httpProvider.defaults.useXDomain = true;
//    delete $httpProvider.defaults.headers.common['X-Requested-With'];
//}
//]);

greenStreakApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('search', {
            url: '/search',
            controller: 'IndexController',
            templateUrl: 'templates/search.html'
        })
        .state('callback', {
            url: '/callback',
            controller: 'CallbackController',
            templateUrl: 'templates/callback.html'
        })
        .state('one', {
            url: '/one',
            controller: 'OneController',
            templateUrl: 'templates/one.html'
        })
        .state('square', {
            url: '/square',
            controller: 'SquareController',
            templateUrl: 'templates/square.html'
        })
        .state('three', {
            url: '/three',
            controller: 'ThreeController',
            templateUrl: 'templates/three.html'
        })
        .state('authenticate', {
            url: '/authenticate',
            controller: 'AuthController',
            templateUrl: 'templates/authenticate.html'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/authenticate');
    }
])