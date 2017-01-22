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
        .state('pedidos', {
          url: '/pedidos',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Pedidos',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 100,
          },
        })
        .state('pedidos.nuevoPedido', {
          url: '/nuevoPedido',
          templateUrl: 'app/pages/articulos/pedido.html',
          controller: 'PedidoPageCtrl',
          controllerAs: 'vm',
          title: 'Nuevo Pedido',
          sidebarMeta: {
            order: 101,
          },
        })
        ;
    $urlRouterProvider.when('/pedidoactual','/pedidoactual/nuevoPedido');
  }

})();
