/**
 * Created by David on 21/01/2017.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages')
        .factory('PedidoSrv', PedidoSrv);

    /** @ngInject */
    function PedidoSrv($log, $http, $q, $window, Config) {

        var pedido = {"proveedor": "", "articulos": [], "subtotal": "0", "totalIVA21": "0","totalIVA10": "0", "totalImpuesto": "0", "total": "0"};

        var metodos = {
            resetPedidoActual: resetPedidoActual,
            getPedidoActual: getPedidoActual,
            setPedidoActual: setPedidoActual,
            getPedidos: getPedidos,
            agregarArticulo: agregarArticulo,
        };
        return metodos;


        function resetPedidoActual() {
            var pedido = {"proveedor": "", "articulos": [], "subtotal": "0", "totalIVA21": "0","totalIVA10": "0", "totalImpuesto": "0", "total": "0"};
            $window.sessionStorage.setItem("pedidoActual", JSON.stringify(pedido));
            return pedido;
        }

        function agregarArticulo(art) {
            var d = $q.defer();
            var p = d.promise;
            getPedidoActual().then(function (data) {
                data.articulos.push(art);
                setPedidoActual(data).then(function (data) {
                    d.resolve(data);
                })
            });
            return p;
        }

        function getPedidoActual() {
            var d = $q.defer();
            var p = d.promise;
            var ped = angular.fromJson($window.sessionStorage.getItem('pedidoActual'));
            if (!ped) {
                ped = setPedidoActual(pedido);
            }
            $log.log("LEYENDO PEDIDO:");
            $log.log(ped);
            d.resolve(ped);
            return p;
        }

        function setPedidoActual(args) {
            var d = $q.defer();
            var p = d.promise;

            // quito articulos removidos
            var tmp = [];
            angular.forEach(args.articulos, function (val) {
                if (!val.remover) {
                    tmp.push(val);
                }
            });
            args.articulos = tmp;

            // calculo totales
            //if(args.articulos.length>0){
            var subtotal = 0;
            var iva = 0;
            var totalIVA21 = 0;
            var totalIVA10 = 0;
            var totalImpuestos = 0;
            var total;
            var impuesto=0

            angular.forEach(args.articulos, function (val) {
                subtotal += val.precio_2 * val.cantidad;
                iva = val.precio_2 * val.cantidad * (val.impuesto / 100);
                if(val.impuesto=="21"){
                    totalIVA21 += iva;
                } else {
                    totalIVA10 += iva;
                }
                $log.log(val.precio_4);
                if(val.precio_4>0){
                    impuesto = ((val.precio_2 * val.cantidad) + iva) * (1 + (val.precio_4 / 100));
                    totalImpuestos += impuesto;
                }

            });
            total = (subtotal + totalIVA10 + totalIVA21 + totalImpuestos) * 1;

            args.subtotal = subtotal;
            args.totalIVA21 = totalIVA21;
            args.totalIVA10 = totalIVA10;
            args.totalImpuestos = totalImpuestos;
            args.total = total;

            //}

            $window.sessionStorage.setItem("pedidoActual", JSON.stringify(args));
            $log.log("GUARDO PEDIDO:");
            $log.log(args);
            d.resolve(args);
            return p;
        }

        function getPedidos(args) {
            var d = $q.defer();
            var p = d.promise;
            if (args) {
                args = "/" + args;
            } else {
                args = "";
            }
            $http.get(Config.ENV.SERVER + 'pedidos' + args).then(function (data) {
                $log.log(data.data);
                d.resolve(data.data);
            });
            return p;

        }
    }

})();

