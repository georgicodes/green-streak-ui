angular.module('green-streak.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('MenuService', function () {

        var menuItems = [
            { text: '1 Page One', iconClass: 'icon ion-map', link: 'one'},
            { text: '2 Page Two', iconClass: 'icon ion-gear-b', link: 'two'},
            { text: '3 Page Three', iconClass: 'icon ion-star', link: 'three'}
        ];

        return {
            all: function () {
                return menuItems;
            }
        }
    })

    .factory('LanguagesService', function () {

        var data = [
            { key: 'Java', y: '5'},
            { key: 'Scala', y: '2'},
            { key: 'Matlab', y: '1'},
            { key: 'Fortran', y: '11'}
        ];

        return {
            all: function () {
                return data;
            }
        }
    });

