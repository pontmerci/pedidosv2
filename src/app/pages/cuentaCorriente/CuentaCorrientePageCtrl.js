/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cuentaCorriente')
      .controller('CuentaCorrienteCtrl', CuentaCorrienteCtrl);

  /** @ngInject */
  function CuentaCorrienteCtrl($log, $scope, $timeout, baProgressModal, CuentaCorrienteSrv, UsuarioSrv, $uibModal, toastr) {

      $scope.filtro = {dt1: new Date(),dt2: new Date(),comprobante:''};
      $scope.comprobantes = [{id:0,nombre:'Factura'},{id:1,nombre:'Nota de Credito'}];
      $scope.cargado=false;
      $scope.saldoIni = 0;
      $scope.saldoFin = 0;
      $scope.saldoVen = 0;
      $scope.smartTableData = [];
      $scope.smartTablePageSize = 25;
      var args = {cuenta:'',fechaIni:'',fechaFin:''};
      var token = window.sessionStorage.getItem("token");
      UsuarioSrv.getUsuario(token).then(function (data) {
          args.cuenta = data.id_usuario;
          $scope.cargado=true;
      })

      $scope.recuperar = function () {
          $scope.cargado=false;
          var fi = moment($scope.filtro.dt1).format('YYYY-MM-DD');
          var ff = moment($scope.filtro.dt2).format('YYYY-MM-DD');
          args.fechaIni = fi;
          args.fechaFin = ff;
          //$log.log(args);
          CuentaCorrienteSrv.getMovimientos(args).then(function (data) {
              $scope.saldoIni = data.saldoIni[0].saldoIni;
              $scope.saldoFin = data.saldoFin[0].saldoFin;
              $scope.saldoVen = data.saldoVen[0].saldoVen;
              var saldoAnt = $scope.saldoIni;
              var importe = 0;
              var movim = [];
              angular.forEach(data.movimientos, function(value) {
                  importe = value.debe - value.haber;
                  saldoAnt = ((saldoAnt*1) + (importe*1));
                  value.saldoAnt = saldoAnt;
                  movim.push(value);
              });
              $scope.smartTableData = movim;
              $scope.cargado=true;
          });
      };



      //fechas

      $scope.dateOptions = {
          showWeeks: false,
      };

      $scope.open1 = function() {
          $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
          $scope.popup2.opened = true;
      };

      $scope.popup1 = {
          opened: false
      };

      $scope.popup2 = {
          opened: false
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
