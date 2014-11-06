'use strict';
app.controller('PostCtrl', function($scope, $location, postService){
    $scope.posts = postService.all();
    $scope.post = {url:'http://', title:''};

    $scope.submitPost = function(){
        postService.create($scope.post).then(function(ref){
            $scope.post = {url:'http://', title:''};
            $location.path('/posts/'+ref.name());
        });
    };

    $scope.deletePost = function(post){
        postService.delete(post);
    };
});