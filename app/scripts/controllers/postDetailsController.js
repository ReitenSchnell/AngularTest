app.controller('PostDetailsCtrl', function($scope, $routeParams, postService, authService){
   $scope.post = postService.get($routeParams.postId);
   $scope.comments = postService.comments($routeParams.postId);
   $scope.user = authService.currentUser;
   $scope.signedIn = authService.signedIn;

   $scope.addComment = function(){
       if (!$scope.commentText || $scope.commentText === ''){
           return;
       }

       var comment = {
           text : $scope.commentText,
           creator : $scope.user.profile.username,
           creatorId : $scope.user.uid
       };
       $scope.comments.$add(comment);
       $scope.commentText = ''
   };

   $scope.removeComment = function(comment){
       $scope.comments.$remove(comment)
   }
});
