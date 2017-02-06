/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.pedidos', ['ui.select', 'ngSanitize'])
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
            icon: 'ion-android-cart',
            order: 100,
          },
        })
        .state('pedidos.nuevoPedido', {
          url: '/nuevoPedido',
          templateUrl: 'app/pages/pedidos/pedido.html',
          controller: 'PedidoPageCtrl',
          controllerAs: 'vm',
          title: 'Nuevo Pedido',
          sidebarMeta: {
            order: 101,
          },
        })
        .state('pedidos.listaPedido', {
            url: '/listaPedido',
            templateUrl: 'app/pages/pedidos/listaPedidos.html',
            controller: 'ListaPedidoPageCtrl',
            controllerAs: 'vm',
            title: 'Listado de Pedidos',
            sidebarMeta: {
                order: 102,
            },
        })
        ;
    $urlRouterProvider.when('/pedidoactual','/pedidoactual/nuevoPedido');
  }

})();
