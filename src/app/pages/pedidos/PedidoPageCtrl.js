/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.pedidos')
      .controller('PedidoPageCtrl', PedidoPageCtrl);

  /** @ngInject */
  function PedidoPageCtrl($log, $scope, PedidoSrv, ArticulosSrv, ProveedoresSrv, FamiliasSrv, MarcasSrv, $timeout, baProgressModal, $uibModal, toastr) {

      $scope.cargado=false;
      $scope.filtro = {rubro:'',marca:''};
      $scope.smartTableData = [];
      $scope.smartTablePageSize = 25;
      $scope.selProv;
      PedidoSrv.getPedidoActual().then(function (data) {
          $scope.pedido=data;
          $scope.itemcount = data.articulos.length;
          $log.log(data.proveedor);
          if(data.proveedor){
              $scope.selProv = data.proveedor;
              //var args = '/filtro/artpro.codproveedor,=,'+data.proveedor.codproveedor;
              var args = '/artpro/'+data.proveedor.codproveedor+'/1,=,1';
              $log.log(args);
              ArticulosSrv.getArticulos(args).then(function (data) {
                  $log.log('art:');
                  $log.log(data);
                  $scope.smartTableData = data;
                  $scope.cargado=true;
              });
          }
      });

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
      var args = "/filtro/borrado,<>,'S',and,rotacion,=,'S'";
      ProveedoresSrv.getProveedores(args).then(function (data) {
          $scope.proveedores = data;
          var sobrante = {"codproveedor":"-100","nombre":"Sobrante Portal","nif":null,"direccion":null,"codprovincia":null,"localidad":null,"codentidad":null,"cuentabancaria":null,"codpostal":null,"telefono":null,"movil":null,"email":null,"web":null,"borrado":"","rotacion":"S","fecha_modificacion":null};
          $scope.proveedores.unshift(sobrante);
          $scope.cargado=true;
      });

      $scope.buscarArt = function () {
          $scope.cargado=false;
          $scope.smartTableData = [];
          $scope.smartTablePageSize = 25;
          //var args = '/filtro/artpro.codproveedor,=,'+ $scope.pedido.proveedor.codproveedor;
          var args = '/artpro/'+$scope.pedido.proveedor.codproveedor+'/1,=,1';
          if($scope.filtro.rubro){
              args += ',and,articulos.codfamilia,=,' + $scope.filtro.rubro.codfamilia;
          }
          if($scope.filtro.marca){
              args += ',and,articulos.codproveedor1,=,' + $scope.filtro.marca.codmarca;
          }
          $log.log('FILTRO ARTICULOS');
          $log.log(args);
          ArticulosSrv.getArticulos(args).then(function (data) {
              //$log.log(data.data);
              $scope.smartTableData = data;
              $scope.cargado=true;
          });
      }

      $scope.abrirCambioProv = function (p) {
          $scope.provSel = p;
          $uibModal.open({
              animation: true,
              templateUrl: 'app/pages/pedidos/includes/modal/cambioProveedor.html',
              size: 'md',
              scope: $scope
          });
      };

      $scope.cambiaProveedor = function (b) {
          if(b){
              // cambio el proveedor, tengo que resetear el pedido
              toastr.success('', 'Cambio de Proveedor Realizado.', {
                  "autoDismiss": true,
                  "positionClass": "toast-top-right",
                  "type": "success",
                  "timeOut": "1000",
                  "extendedTimeOut": "1000",
                  "allowHtml": false,
                  "closeButton": false,
                  "tapToDismiss": true,
                  "progressBar": false,
                  "newestOnTop": true,
                  "maxOpened": 0,
                  "preventDuplicates": false,
                  "preventOpenDuplicates": false
              });

              $scope.cargado=false;
              $scope.pedido  = PedidoSrv.resetPedidoActual();
              $scope.itemcount = 0;
              $scope.pedido.proveedor = $scope.provSel;
              PedidoSrv.setPedidoActual($scope.pedido).then(function (data) {
                  $scope.pedido = data;
                  //var args = '/filtro/artpro.codproveedor,=,'+$scope.pedido.proveedor.codproveedor;
                  var args = '/artpro/'+$scope.pedido.proveedor.codproveedor+'/1,=,1';
                  ArticulosSrv.getArticulos(args).then(function (data) {
                      //$log.log(data.data);
                      $scope.smartTableData = data;
                      $scope.cargado=true;
                  });
              });
          }else{
              $scope.provSel = 0;
              toastr.success('', 'Cambio de Proveedor Cancelado.', {
                  "autoDismiss": true,
                  "positionClass": "toast-top-right",
                  "type": "error",
                  "timeOut": "1000",
                  "extendedTimeOut": "1000",
                  "allowHtml": false,
                  "closeButton": false,
                  "tapToDismiss": true,
                  "progressBar": false,
                  "newestOnTop": true,
                  "maxOpened": 0,
                  "preventDuplicates": false,
                  "preventOpenDuplicates": false
              });

          }


      }

      $scope.abrir = function (item) {
          $scope.artSel = item
          $uibModal.open({
              animation: true,
              templateUrl: 'app/pages/pedidos/includes/modal/agregarArticulo.html',
              size: 'md',
              scope: $scope
          });
      };
      
      $scope.agregar = function () {
          $log.log($scope.artSel);
          PedidoSrv.agregarArticulo($scope.artSel).then(function (data) {
              $scope.pedido  = data;
              $scope.itemcount = data.articulos.length;
              toastr.success('', 'Articulo Agregado!', {
                  "autoDismiss": true,
                  "positionClass": "toast-top-right",
                  "type": "success",
                  "timeOut": "1000",
                  "extendedTimeOut": "1000",
                  "allowHtml": false,
                  "closeButton": false,
                  "tapToDismiss": true,
                  "progressBar": false,
                  "newestOnTop": true,
                  "maxOpened": 0,
                  "preventDuplicates": false,
                  "preventOpenDuplicates": false
              })
          });

      }

      // editar pedido
      $scope.modificaCantidad = function () {
          PedidoSrv.setPedidoActual($scope.pedido).then(function (data) {
              $scope.pedido = data;
          });
      }

      $scope.eliminaArt = function (i) {
          $scope.pedido.articulos[i].remover = true;
          PedidoSrv.setPedidoActual($scope.pedido).then(function (data) {
              $scope.pedido = data;
          });
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
