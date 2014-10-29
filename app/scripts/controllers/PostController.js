'use strict';
app.controller('PostCtrl', function($scope, postService){
    $scope.posts = postService.get();
    $scope.post = {url:'http://', title:''};

    $scope.submitPost = function(){
        postService.save($scope.post).$promise.then(function(ref){
            $scope.posts[ref.name] = $scope.post;
            $scope.post = {url:'http://', title:''};
        });
    };

    $scope.deletePost = function(postId){
        postService.delete({id:postId}).$promise.then(function(){
            delete $scope.posts[postId];
        });
    };
});