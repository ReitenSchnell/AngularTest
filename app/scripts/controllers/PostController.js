'use strict';
app.controller('PostCtrl', function($scope, $location, postService){
    $scope.posts = postService.all();
    $scope.post = {url:'http://', title:''};

    $scope.deletePost = function(post){
        postService.delete(post);
    };
});