angular.module('green-streak.controllers', [])

    .controller('MenuController', function ($scope, $location, MenuService) {
        // "MenuService" is a service returning mock data (services.js)
        $scope.list = MenuService.all();

        $scope.goTo = function(page) {
            console.log('Going to ' + page);
            $scope.sideMenuController.toggleLeft();
            $location.url('/' + page);
        };
    })

    .controller('AuthenticateController', function ($scope, AuthService) {
        $scope.navTitle = "Login";

//        var authOk = AuthService.authenticate(function(result) {
//            $scope.isAuthenticated = result.authOk;
//            console.log($scope.isAuthenticated);
//        });

//        $scope.auth = AuthService.authenticate();
//        console.log("auth: " + $scope.auth)

//        $scope.authenticate = function() {
//
//        }

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.sideMenuController.toggleLeft();
            }
        }];

        $scope.rightButtons = [];
    })

    .controller("CallbackController", function($scope, $location, AuthService) {
        console.log("callback")
        $scope.currentURL = $location.absUrl();
        var paramPartOfURL = $scope.currentURL.slice($scope.currentURL.indexOf('code=') + 5);
        var indexOfSlash = paramPartOfURL.indexOf('/');
        var sliced =  paramPartOfURL.slice(0, indexOfSlash)
        console.log("location " +  $scope.currentURL)
        console.log("sliced " +  sliced)
        $scope.auth = AuthService.get({'tokenId': sliced}); // Calls: GET /api/booking/1
        console.log("auth: " + $scope.auth)
    })

    .controller('OneController', function ($scope, LanguagesService) {
        $scope.navTitle = "Language Data by count";

        $scope.d3Data = LanguagesService.all();

        $scope.d3OnClick = function(item){
//            alert(item.name);
        };

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.sideMenuController.toggleLeft();
            }
        }];

        $scope.rightButtons = [];
    })

    .controller('TwoController', function ($scope) {
        $scope.navTitle = "Page Two Title";

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.sideMenuController.toggleLeft();
            }
        }];

        $scope.rightButtons = [];
    })

    .controller('ThreeController', function ($scope) {
        $scope.navTitle = "Page Three Title";

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.sideMenuController.toggleLeft();
            }
        }];

        $scope.rightButtons = [];
    });
