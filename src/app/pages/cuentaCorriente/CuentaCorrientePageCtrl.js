/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cuentaCorriente')
      .controller('CuentaCorrienteCtrl', CuentaCorrienteCtrl);

  /** @ngInject */
  function CuentaCorrienteCtrl($log, $scope, $timeout, baProgressModal, CuentaCorrienteSrv, $uibModal, toastr) {

      $scope.cargado=true;
      $scope.smartTableData = [];
      $scope.smartTablePageSize = 25;
      var args = {cuenta:'',fechaIni:'',fechaFin:''};

      $scope.recuperar = function () {
          $scope.cargado=false;
          CuentaCorrienteSrv.getMovimientos(args).then(function (data) {
              $log.log(data[saldoIni]);
              $log.log(data[movimientos]);
              $log.log(data[saldoFin]);
              $log.log(data[saldoVen]);
              //$scope.smartTableData = data[movimientos];
              $scope.cargado=true;
          });
      };




      // MUESTRA LA ANIMACION DE CARGANDO
      baProgressModal.setProgress(0);
      (function changeValue() {
          if (baProgressModal.getProgress() >= 100) {
              baProgressModal.setProgress(0);
              $timeout(changeValue, 300);
          } else {
              baProgressModal.setProgress(baProgressModal.getProgress() + 10);
              $timeout(changeValue, 300);
          }
      })();




  }

})();
