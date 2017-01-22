/**
 * Created by David on 21/01/2017.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages')
        .factory('ArticulosSrv', ArticulosSrv);

    /** @ngInject */
    function ArticulosSrv($log, $http, $q) {

        var metodos = {
            getArticulos: getArticulos,
            // getArticulosByProv: getArticulosByProv,
        };
        return metodos;

        function getArticulos(args) {
            var d = $q.defer();
            var p = d.promise;
            if(args){
                args ="/"+args;
            } else {
                args = "";
            }
            $http.get('http://provinciasunidasltd.com.ar/apiv1/public/api.php/articulos'+args).then(function (data) {
                $log.log(data.data);
                d.resolve(data.data);
            });
            return p;

        }
    }
})();


