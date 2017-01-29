/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cuentaCorriente', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('cuentaCorriente', {
          url: '/cuentacorriente',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Cuenta Corriente',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 200,
          },
        })
        .state('cuentaCorriente.listado', {
          url: '/listado',
          templateUrl: 'app/pages/cuentaCorriente/cuentaCorriente.html',
          controller: 'CuentaCorrienteCtrl',
          controllerAs: 'vm',
          title: 'Listado de Movimientos',
          sidebarMeta: {
            order: 201,
          },
        })
        ;
    $urlRouterProvider.when('/pedidoactual','/pedidoactual/nuevoPedido');
  }

})();
