/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.bienvenido')
      .directive('saludo', saludo);

  /** @ngInject */
  function saludo() {
    return {
      restrict: 'E',
      controller: 'SaludoCtrl',
      templateUrl: 'app/pages/bienvenido/saludo/saludo.html'
    };
  }
})();