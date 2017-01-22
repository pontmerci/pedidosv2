/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.articulos')
      .controller('PedidoPageCtrl', PedidoPageCtrl);

  /** @ngInject */
  function PedidoPageCtrl($log, $scope, ArticulosSrv, ProveedoresSrv, FamiliasSrv, MarcasSrv, $timeout, baProgressModal, $uibModal) {


      $scope.pedido = {proveedor:'PROVEEDOR1',
          items:[
              {renglon:1,descripcion:'ITEM1',cantidad:2,precio:12.4},
              {renglon:2,descripcion:'ITEM1',cantidad:2,precio:12.4},
              {renglon:3,descripcion:'ITEM1',cantidad:2,precio:12.4},
              {renglon:4,descripcion:'ITEM1',cantidad:2,precio:12.4}
          ],
          subtotal: 100.00,
          iva1: 21.00,
          iva2: 1.50,
          imp: 0.00,
          total: 122.50
      };
      $scope.itemcount = $scope.pedido.items.length; // ;

      $scope.filtro = {proveedor:'',rubro:'',marca:''};
      $scope.smartTableData = [];
      $scope.smartTablePageSize = 5;
      $scope.selProv =-1;

      $scope.cargado=false;
      $scope.rubros = [];
      FamiliasSrv.getFamilias().then(function (data) {
          //$log.log(data);
          $scope.rubros = data;
          $scope.cargado=true;
      });

      $scope.cargado=false;
      $scope.marcas = [];
      MarcasSrv.getMarcas().then(function (data) {
          //$log.log(data);
          $scope.marcas = data;
          $scope.cargado=true;
      });

      $scope.cargado=false;
      $scope.proveedores = [];
      ProveedoresSrv.getProveedores().then(function (data) {
          $scope.proveedores = data;
          $scope.cargado=true;
      })

      $scope.cambiaProveedor = function (p) {
          $log.log(p);
          $scope.selProv =p;
          $scope.cargado=false;
          var args = '/filtro/artpro.codproveedor,=,'+p.codproveedor;
          ArticulosSrv.getArticulos(args).then(function (data) {
              //$log.log(data.data);
              $scope.smartTableData = data;
              $scope.cargado=true;
          });
      }

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
