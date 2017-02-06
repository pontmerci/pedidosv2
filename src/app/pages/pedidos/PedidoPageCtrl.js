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
      $scope.smartTablePageSize = 5;
      $scope.selProv;
      PedidoSrv.getPedidoActual().then(function (data) {
          $scope.pedido=data;
          $scope.itemcount = data.articulos.length;
          $log.log(data.proveedor);
          if(data.proveedor){
              $scope.selProv = data.proveedor;
              //var args = '/filtro/artpro.codproveedor,=,'+data.proveedor.codproveedor;
              $scope.buscarArt();
          }else{
              $scope.cargado=true;
          }
      });

      function recuperaArticulo(data) {
          //$scope.cargado=false;
          $log.log(data);
          $scope.smartTableData = data;
          $scope.cargado=true;
      }

      function callback(err) {
          $log.log(err);
          toastr.error(err, 'Ha ocurrido un problema.', {
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
          $scope.cargado=true;
      }

      $scope.rubros = [];
      FamiliasSrv.getFamilias().then(function (data) {
          //$log.log(data);
          $scope.rubros = data;
          //$scope.cargado=true;
      });

      $scope.marcas = [];
      MarcasSrv.getMarcas().then(function (data) {
          //$log.log(data);
          $scope.marcas = data;
          //$scope.cargado=true;
      });

      $scope.proveedores = [];
      var args = "/filtro/borrado,<>,'S',and,rotacion,=,'S'";
      ProveedoresSrv.getProveedores(args).then(function (data) {
          $scope.proveedores = data;
          var sobrante = {"codproveedor":"-100","nombre":"Sobrante Portal","nif":null,"direccion":null,"codprovincia":null,"localidad":null,"codentidad":null,"cuentabancaria":null,"codpostal":null,"telefono":null,"movil":null,"email":null,"web":null,"borrado":"","rotacion":"S","fecha_modificacion":null};
          $scope.proveedores.unshift(sobrante);
          //$scope.cargado=true;
      });

      $scope.buscarArt = function () {
          $scope.cargado=false;
          $scope.smartTableData = [];
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
          ArticulosSrv.getArticulos(args).then(recuperaArticulo, callback);
      };

      $scope.abrirCambioProv = function (p) {
        // si hay un proveedor seleccionado pregunto si quiere resetear el pedido
          $scope.provSel = p;
          if ($scope.pedido.proveedor != ""){
              $uibModal.open({
                  animation: true,
                  templateUrl: 'app/pages/pedidos/includes/modal/cambioProveedor.html',
                  size: 'md',
                  scope: $scope
              });
          }else{
              $scope.cambiaProveedor(true);

          }




      };

      $scope.cambiaProveedor = function (b) {
          if(b){
              // cambio el proveedor, tengo que resetear el pedido
              toastr.success('', 'Proveedor seleccionado.', {
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
                  ArticulosSrv.getArticulos(args).then(recuperaArticulo, callback);
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
      };

      $scope.abrirArt = function (item) {
          $scope.artSel = item
          $uibModal.open({
              animation: true,
              templateUrl: 'app/pages/pedidos/includes/modal/agregarArticulo.html',
              size: 'md',
              scope: $scope
          });
      };
      
      $scope.agregarArt = function () {
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

      };

      // editar pedido
      $scope.modificaCantidad = function () {
          PedidoSrv.setPedidoActual($scope.pedido).then(function (data) {
              $scope.pedido = data;
          });
      };

      $scope.eliminaArt = function (i) {
          $scope.pedido.articulos[i].remover = true;
          PedidoSrv.setPedidoActual($scope.pedido).then(function (data) {
              $scope.pedido = data;
          });
      };

      // guardar pedido
      $scope.enviarPedido = function () {

      };

      $scope.imprimirPedido = function () {
          // TODO
          var docDefinition = {
              content: [
                  {text: 'Tables', style: 'header'},
                  'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
                  {text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
                  'The following table has nothing more than a body array',
                  {
                      style: 'tableExample',
                      table: {
                          body: [
                              ['Column 1', 'Column 2', 'Column 3'],
                              ['One value goes here', 'Another one here', 'OK?']
                          ]
                      }
                  }
              ],
              styles: {
                  header: {
                      fontSize: 18,
                      bold: true,
                      margin: [0, 0, 0, 10]
                  },
                  subheader: {
                      fontSize: 16,
                      bold: true,
                      margin: [0, 10, 0, 5]
                  },
                  tableExample: {
                      margin: [0, 5, 0, 15]
                  },
                  tableHeader: {
                      bold: true,
                      fontSize: 13,
                      color: 'black'
                  }
              },
              defaultStyle: {
                  // alignment: 'justify'
              }
          };
          pdfMake.createPdf(docDefinition).open();

      };

      $scope.guardarPedido = function () {
          // TODO
          $scope.cargado=false;
          $scope.pedido=PedidoSrv.resetPedidoActual();
          $scope.smartTableData = {};
          $scope.selProv = {};
          $scope.cargado=true;
          return $timeout(function() {window.location.reload(false);}, 3000);

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
