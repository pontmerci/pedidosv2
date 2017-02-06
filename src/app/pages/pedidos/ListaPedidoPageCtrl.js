/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.pedidos')
      .controller('ListaPedidoPageCtrl', ListaPedidoPageCtrl);

  /** @ngInject */
  function ListaPedidoPageCtrl($log, $scope, ProveedoresSrv, $timeout, baProgressModal) {

      $scope.cargado=false;
      $scope.filtro = {dt1: new Date(),dt2: new Date()};
      $scope.smartTableData = [];
      $scope.smartTablePageSize = 25;

      $scope.proveedores = [];
      var args = "/filtro/borrado,<>,'S'";
      ProveedoresSrv.getProveedores(args).then(function (data) {
          $scope.proveedores = data;
          var sobrante = {"codproveedor":"-100","nombre":"Sobrante Portal","nif":null,"direccion":null,"codprovincia":null,"localidad":null,"codentidad":null,"cuentabancaria":null,"codpostal":null,"telefono":null,"movil":null,"email":null,"web":null,"borrado":"","rotacion":"S","fecha_modificacion":null};
          $scope.proveedores.unshift(sobrante);
          $scope.cargado=true;
      });

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
      }





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
