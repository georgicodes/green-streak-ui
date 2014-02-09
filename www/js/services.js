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
            { name: 'Java', count: '5'},
            { name: 'Scala', count: '2'},
            { name: 'Matlab', count: '1'},
            { name: 'Fortran', count: '11'},
        ];

        return {
            all: function () {
                return data;
            }
        }
    });

