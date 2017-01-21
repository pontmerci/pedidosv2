/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .controller('PageTopCtrl', PageTopCtrl);

  /** @ngInject */
  function PageTopCtrl($log, $scope, $window) {

    $scope.salir = function () {
        $log.log('Chau!');
        window.sessionStorage.clear();
        $window.location.href = "/auth.html";
    }

  }
})();