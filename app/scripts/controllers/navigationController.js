'use strict';
app.controller('NavCtrl', function($scope, $location, postService){
    $scope.post = {title:"", url:"http://"};
    $scope.submitPost = function(){
        postService.create($scope.post).then(function(ref){
            $scope.post = {url:'http://', title:''};
            $location.path('/posts/'+ref.name());
        });
    };
});
