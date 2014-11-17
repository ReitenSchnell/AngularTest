'use strict';
app.controller('PostCtrl', function($scope, $location, postService, authService){
    $scope.posts = postService.all();
    $scope.post = {url:'http://', title:''};
    $scope.user = authService.currentUser;

    $scope.deletePost = function(post){
        postService.delete(post);
    };
});