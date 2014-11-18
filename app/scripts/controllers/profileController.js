'use strict';
app.controller('ProfileCtrl', function($scope, $routeParams, profileService){
    var uid = $routeParams.userId;
    $scope.profile = profileService.get(uid);
    profileService.getPosts(uid).then(function(posts){
        $scope.posts = posts;
    });
});