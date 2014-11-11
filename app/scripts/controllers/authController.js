'use strict';
app.controller('AuthCtrl', function($scope, $location, authService, user){
    if(user){
        redirectToHome();
    }

    $scope.register = function(){
        authService.register($scope.user).then(function(){
            return authService.login($scope.user).then(function(){
                redirectToHome();
            })
        })
    };

    $scope.login = function(){
        authService.login($scope.user).then(function(){
            redirectToHome();
        })
    };

    function redirectToHome() {
        $location.path('/')
    }
});
