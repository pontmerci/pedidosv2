/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .run(themeRun);

  /** @ngInject */
  function themeRun($log, $window, $timeout, $rootScope, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings, $http) {
    var whatToWait = [
      //preloader.loadAmCharts(),
      $timeout(0)
    ];

    var theme = themeLayoutSettings;
    if (theme.blur) {
      if (theme.mobile) {
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-mobile.jpg'));
      } else {
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg.jpg'));
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-blurred.jpg'));
      }
    }

    $q.all(whatToWait).then(function () {
      $rootScope.$pageFinishedLoading = true;
    });

    $timeout(function () {
      if (!$rootScope.$pageFinishedLoading) {
        $rootScope.$pageFinishedLoading = true;
      }
    }, 100);

    $rootScope.$baSidebarService = baSidebarService;

    var token= window.sessionStorage.getItem("token");
    if (!token){
        $window.location.href = "/auth.html";
    }else{
        $http.get('http://provinciasunidasltd.com.ar/apiv1/public/api.php/validar/'+token).then(function (data) {
            $log.log(data.data);
            if(!data.data){
               $window.location.href = "/auth.html";
            }
        })
    }


  }

})();