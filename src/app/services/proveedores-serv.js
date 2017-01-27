/**
 * Created by David on 21/01/2017.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages')
        .factory('ProveedoresSrv', ProveedoresSrv);

    /** @ngInject */
    function ProveedoresSrv($log, $http, $q, Config) {

        var metodos = {
            getProveedores: getProveedores,
        };
        return metodos;

        function getProveedores(args) {
            var d = $q.defer();
            var p = d.promise;
            if(args){
                args ="/"+args;
            } else {
                args = "";
            }
            $http.get(Config.ENV.SERVER+'proveedores'+args).then(function (data) {
                $log.log(data.data);
                d.resolve(data.data);
            });
            return p;

        }
    }
})();


