'use strict';
app.controller('AuthCtrl', function($scope, $location, authService, authorizedUser){
    if(authorizedUser){
        redirectToHome();
    }

    $scope.register =  function () {
        authService.register($scope.user).then(function(newUser) {
            return authService.login($scope.user).then(function() {
                newUser.username = $scope.user.username;
                return authService.createProfile(newUser);
            }).then(function() {
                $location.path('/');
            });
        }, function(error) {
            $scope.error = error.toString();
        });
    };

    $scope.login = function(){
        authService.login($scope.user).then(function(){
            redirectToHome();
        }, function(error){
            $scope.error = error.toString();
        })
    };

    function redirectToHome() {
        $location.path('/')
    }
});
