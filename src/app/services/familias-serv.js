/**
 * Created by David on 21/01/2017.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages')
        .factory('FamiliasSrv', FamiliasSrv);

    /** @ngInject */
    function FamiliasSrv($log, $http, $q) {

        // rubros

        var metodos = {
            getFamilias: getFamilias,
        };
        return metodos;

        function getFamilias(args) {
            var d = $q.defer();
            var p = d.promise;
            if(args){
                args ="/"+args;
            } else {
                args = "";
            }
            $http.get('http://provinciasunidasltd.com.ar/apiv1/public/api.php/familias'+args).then(function (data) {
                $log.log(data.data);
                d.resolve(data.data);
            });
            return p;

        }
    }
})();

