angular.module('green-streak.services', ['ngResource', 'green-streak.configuration'])
/**
 * A simple example service that returns some data.
 */
    .factory('MenuService', function () {

        var menuItems = [
            { text: 'Search', iconClass: 'icon ion-android-search', link: 'search'},
            { text: 'Square', iconClass: 'icon ion-android-friends', link: 'square'},
//            { text: '3 Page Three', iconClass: 'icon ion-star', link: 'three'},
//            { text: 'Auth', iconClass: 'icon ion-star', link: 'authenticate'}
        ];

        return {
            all: function () {
                return menuItems;
            }
        }
    })

    .factory('AuthService', function ($resource, API_END_POINT) {
        return $resource(
            API_END_POINT + "/auth/:tokenId",
            {tokenId: "@tokenId"}
        );
    })

    .factory('LanguageCountService', function ($resource, API_END_POINT) {
        return $resource(
            API_END_POINT + "/languages"
        );
    })

    .factory('ContributionsService', function ($resource, API_END_POINT) {
        return $resource(
            API_END_POINT + "/contributions/:userId",
            {userId: "@userId"},
            {
                list: {
                    method: 'GET',
                    isArray: true
                }
            }
        );
    })

    .factory('LanguagesService', function () {

        var data = [
            { name: 'Java', count: '5'},
            { name: 'Scala', count: '2'},
            { name: 'Matlab', count: '1'},
            { name: 'Fortran', count: '11'}
        ];

        return {
            all: function () {
                return data;
            }
        }
    });

