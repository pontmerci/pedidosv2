/**
 * Created by David on 21/01/2017.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages')
        .factory('CuentaCorrienteSrv', CuentaCorrienteSrv);

    /** @ngInject */
    function CuentaCorrienteSrv($log, $http, $q, $window, Config) {


        var metodos = {
            getMovimientos: getMovimientos,
        };
        return metodos;

        function getMovimientos(args) {
            var d = $q.defer();
            var p = d.promise;
            $http.get(Config.ENV.SERVER+'cuenta_corriente/'+args[cuenta]+'/'+args[fechaIni]+'/'+args[fechaFin]).then(function (data) {
                $log.log(data.data);
                d.resolve(data.data);
            });

            return p;
        }


    }

})();

