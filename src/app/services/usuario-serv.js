/**
 * Created by David on 21/01/2017.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages')
        .factory('UsuarioSrv', UsuarioSrv);

    /** @ngInject */
    function UsuarioSrv($http, $q, Config) {

        var metodos = {
            getUsuario: getUsuario,
        };
        return metodos;

        function getUsuario(token) {
            var d = $q.defer();
            var p = d.promise;

            $http.get(Config.ENV.SERVER+'adj_usuarios/'+token).then(function (data) {
                //$log.log(data.data);
                d.resolve(data.data);
            });
            return p;

        }
    }
})();

