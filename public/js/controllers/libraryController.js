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
    'YourGistService',

    function ($scope, $http, $localStorage, GistService, YourGistService) {
    $scope.localStorage = $localStorage;
    $scope.GistService.gists = GistService.gists;
    $scope.YourGistService.gists = YourGistService.gists;

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
            YourGistService.gists = jsonObject;
        });

    $scope.notLogged =
        $http({
            method: 'GET',
            url: 'http://api.github.com/gists/public'
        }).then(function successCallback(response) {
            GistService.gists = response.data;
        });
}]);
