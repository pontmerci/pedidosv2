/**
 * Created by David on 05/02/2017.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.bienvenido', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('bienvenido', {
                url: '/bienvenido',
                templateUrl: 'app/pages/bienvenido/bienvenido.html',
                title: 'Inicio',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 0,
                },
            });
    }

})();

