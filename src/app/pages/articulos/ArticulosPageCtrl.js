/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.articulos')
      .controller('ArticulosPageCtrl', ArticulosPageCtrl);

  /** @ngInject */
  function ArticulosPageCtrl($log, $scope, ArticulosSrv, $timeout, baProgressModal, $uibModal) {

      $scope.rubros = [];
      $scope.marcas = [];
      $scope.proveedores = [];
      $scope.smartTableData = [];

      $scope.cargado=false;
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

      var args = '/filtro/artpro.codproveedor,=,911';

      ArticulosSrv.getArticulos(args).then(function (data) {
          //$log.log(data.data);
          $scope.smartTableData = data;
          $scope.cargado=true;
      });

      $scope.smartTablePageSize = 10;

      $scope.abrir = function (item) {
          $scope.artSel = item
          $uibModal.open({
              animation: true,
              templateUrl: 'app/pages/articulos/agregarArticulo.html',
              size: 'md',
              scope: $scope
          });
      };
      
      $scope.agregar = function () {
          $log.log($scope.artSel);
      }




  }

})();
