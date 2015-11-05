var myApp = angular.module('myApp');

//obtains public gists for users not logged in
//var xhReq = new XMLHttpRequest();
//xhReq.open("GET", 'http://api.github.com/gists/public', false);
//xhReq.send(null);
//var jsonObject = JSON.parse(xhReq.responseText);


myApp.controller('libraryController', [

    '$scope',
    '$http',
    '$localStorage',
    'GistService',

    function ($scope, $http, $localStorage, GistService) {
    $scope.localStorage = $localStorage;
    $scope.GistService = GistService;

    $scope.logged =

        $http({
            method: 'GET',
            url: '/auth/gists',
            headers: {
                authorization: "Bearer " + $localStorage.message
            }

        }).then(function successCallback(response) {

            jsonObject = JSON.parse(response.data);
            console.log(jsonObject);
            return jsonObject;
        });

    $scope.notLogged =
        $http({
            method: 'GET',
            url: 'http://api.github.com/gists/public'
        }).then(function successCallback(response) {
            GistService.gists = response.data;
        });


}]);
