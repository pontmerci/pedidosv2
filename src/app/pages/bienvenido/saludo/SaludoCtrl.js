/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.bienvenido')
      .controller('SaludoCtrl', SaludoCtrl);

  /** @ngInject */
  function SaludoCtrl($scope) {

      $scope.usu = window.sessionStorage.getItem("descripcion");
      var ahora = moment();
      $scope.saludo = getGreetingTime(ahora);
      $scope.texto = [];
      $scope.texto.push('Bienvenido al Portal de Compras de...');
      $scope.texto.push('Cooperativa de Compras Provincias Unidas Ltda.');
      $scope.texto.push('Puede realizar pedidos de compra on-line');
      $scope.texto.push('Consultar los movimientos de su cuenta corriente');
      $scope.texto.push('...todo desde su computadora, notebook o teléfono!');
      $scope.texto.push('');


      function getGreetingTime (m) {
          var g = null; //return g

          if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

          var split_afternoon = 12 //24hr time to split the afternoon
          var split_evening = 19 //24hr time to split the evening
          var currentHour = parseFloat(m.format("HH"));

          if(currentHour >= split_afternoon && currentHour <= split_evening) {
              g = "Buenas tardes!";
          } else if(currentHour >= split_evening) {
              g = "Buenas noches!";
          } else {
              g = "Buen día!";
          }

          return g;
      }

  }
})();