/**
 * Created by David on 20/01/2017.
 */
angular.module('loginApp', [])
.controller('LoginCtrl', function($log, $scope, $window, $http) {

    $log.log('Hola!');
    $scope.novalida = false;
    $scope.validar = {"usuario":"","password":""};
    $scope.submit = function () {
        $http.get('http://provinciasunidasltd.com.ar/apiv1/public/api.php/adj_usuarios/'+$scope.validar.usuario+'/'+$scope.validar.password).then(function (data) {
            $log.log(data.data);
            if (data.data.valida){
                $log.log('valida');
                window.sessionStorage.setItem("token",data.data.token);
                window.sessionStorage.setItem("descripcion",data.data.descripcion);
                $window.location.href = "/pedidosv2/";
            }else{
                $log.log('novalida');
                $scope.novalida = true;
            }
        },function (err) {
            $log.log(err);
            $log.log('novalida');
            $scope.novalida = true;
        })

    }
});
