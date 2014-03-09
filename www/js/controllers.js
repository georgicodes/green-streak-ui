angular.module('green-streak.controllers', ['LocalStorageModule'])

    .controller('MenuController', function ($scope, $location, MenuService) {
        // "MenuService" is a service returning mock data (services.js)
        $scope.list = MenuService.all();

        $scope.goTo = function (page) {
            console.log('Going to ' + page);
            $scope.sideMenuController.toggleLeft();
            $location.url('/' + page);
        };
    })

    .controller('AuthController', function ($scope, $ionicPlatform, $state, localStorageService) {

        $scope.leftButtons = [
            {
                type: 'button-icon icon ion-navicon',
                tap: function (e) {
                    $scope.sideMenuController.toggleLeft();
                }
            }
        ];

        $scope.rightButtons = [];

    })

    .controller('IndexController', function ($scope, $ionicPlatform, $state, localStorageService) {

//        var authenticated = localStorageService.get('authenticated');
//        if (authenticated)
//        {
//            $state.go('one');
//        }
        $scope.navTitle = "Green Streak";
        $scope.user = {userName: ''};

        $scope.search = function () {
            console.log("Searching for userName: " + $scope.user.userName)
            localStorageService.set("userName", $scope.user.userName);
            $state.go('square');
        };

        $scope.leftButtons = [
            {
                type: 'button-icon icon ion-navicon',
                tap: function (e) {
                    $scope.sideMenuController.toggleLeft();
                }
            }
        ];

        $scope.rightButtons = [];
    })

    .controller("CallbackController", function ($scope, $location, $state, AuthService, localStorageService) {
        $scope.currentURL = $location.absUrl();
        var paramPartOfURL = $scope.currentURL.slice($scope.currentURL.indexOf('code=') + 5);
        var indexOfSlash = paramPartOfURL.indexOf('/');
        var oAuthCode = paramPartOfURL.slice(0, indexOfSlash)

        AuthService.get({'tokenId': oAuthCode}, function (success) {
            localStorageService.add("authenticated", true);
            $state.go('one');
        }, function (error) {  // error callback
            localStorageService.remove("authenticated");
        });
    })

    .controller('OneController', function ($scope, LanguageCountService) {
        $scope.navTitle = "Language Data by count";

        $scope.d3Data = LanguageCountService.query();

        $scope.d3OnClick = function (item) {
//            alert(item.name);
        };

        $scope.leftButtons = [
            {
                type: 'button-icon icon ion-navicon',
                tap: function (e) {
                    $scope.sideMenuController.toggleLeft();
                }
            }
        ];

        $scope.rightButtons = [];
    })

    .controller('SquareController', function ($scope, ContributionsService, localStorageService) {
        $scope.navTitle = "Daily Contribution";

        $scope.contributionData = ContributionsService.list({'userId': localStorageService.get("userName")}, function (success) {
            var result = [];
            for (var i = 0; i < success.length; i++) {
                result.push(success[i][1]);
            }
            console.log("returning results")
            $scope.contributionData = result;
        });

        $scope.deviceWidth = window.innerWidth || document.body.clientWidth;
        $scope.deviceHeight = window.innerHeight || document.body.clientHeight;

        $scope.leftButtons = [
            {
                type: 'button-icon icon ion-navicon',
                tap: function (e) {
                    $scope.sideMenuController.toggleLeft();
                }
            }
        ];

        $scope.rightButtons = [];
    })

    .controller('ThreeController', function ($scope) {
        $scope.navTitle = "Page Three Title";

        $scope.leftButtons = [
            {
                type: 'button-icon icon ion-navicon',
                tap: function (e) {
                    $scope.sideMenuController.toggleLeft();
                }
            }
        ];

        $scope.rightButtons = [];
    });
