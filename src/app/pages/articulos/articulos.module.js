/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.articulos', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('pedidoactual', {
          url: '/pedidoactual',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Pedido Actual',
          controller: 'ArticulosPageCtrl',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 100,
          },
        }).state('pedidoactual.articulos', {
          url: '/articulos',
          templateUrl: 'app/pages/articulos/articulos.html',
          title: 'Articulos',
          sidebarMeta: {
            order: 102,
          },
        }).state('pedidoactual.selprov', {
          url: '/selprov',
          templateUrl: 'app/pages/articulos/articulos.html',
          title: 'Sel. Proveedor',
          sidebarMeta: {
            order: 101,
          },
        });
    $urlRouterProvider.when('/pedidoactual','/pedidoactual/articulos');
  }

})();
