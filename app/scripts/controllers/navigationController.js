'use strict';
app.controller('NavCtrl', function($scope, $location, postService, authService){
    console.log('init');
    $scope.post = {title:"", url:"http://"};
    $scope.signedIn = authService.signedIn;
    $scope.logout = authService.logout;
    $scope.user = authService.currentUser;
    $scope.submitPost = function(){
        postService.create($scope.post).then(function(ref){
            $scope.post = {url:'http://', title:''};
            $location.path('/posts/'+ref.name());
        });
    };
});
