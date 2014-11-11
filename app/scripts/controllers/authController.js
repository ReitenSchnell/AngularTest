'use strict';
app.controller('AuthCtrl', function($scope, $location, authService, user){
    if(user){
        $location.path('/')
    }
    $scope.register = function(){
        authService.register($scope.user).then(function(){
            return authService.login($scope.user).then(function(){
                $location.path('/')
            })
        })
    }
});
