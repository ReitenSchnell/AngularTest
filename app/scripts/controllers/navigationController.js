'use strict';
app.controller('NavCtrl', function($scope, $location, postService, authService){
    $scope.post = {title:"", url:"http://"};
    $scope.signedIn = authService.signedIn;
    $scope.logout = authService.logout;
    $scope.user = authService.currentUser;

    $scope.submitPost = function(){
        $scope.post.creator = $scope.user.profile.username;
        $scope.post.creatorId = $scope.user.uid;
        postService.create($scope.post).then(function(ref){
            $scope.post = {url:'http://', title:''};
        });
    };
});
