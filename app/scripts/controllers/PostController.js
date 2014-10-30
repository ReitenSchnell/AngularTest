'use strict';
app.controller('PostCtrl', function($scope, postService){
    $scope.posts = postService.all;
    $scope.post = {url:'http://', title:''};

    $scope.submitPost = function(){
        postService.create($scope.post).then(function(ref){
            $scope.post = {url:'http://', title:''};
        });
    };

    $scope.deletePost = function(post){
        postService.delete(post);
    };
});