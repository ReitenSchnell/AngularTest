app.controller('PostDetailsCtrl', function($scope, $routeParams, postService){
   $scope.post = postService.get($routeParams.postId);
});
