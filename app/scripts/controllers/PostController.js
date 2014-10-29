'use strict';
app.controller('PostCtrl', function($scope, postService){
    $scope.posts = postService.get();
    $scope.post = {url:'http://', title:''};

    $scope.submitPost = function(){
        postService.save($scope.post).then(function(ref){
            $scope.posts[ref.name] = $scope.post;
            $scope.post = {url:'http://', title:''};
        });
    };

    $scope.deletePost = function(index){
        $scope.posts.splice(index, 1);
    }
});