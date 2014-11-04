'use strict';
describe('Controller: PostDetailsCtrl', function(){
   var PostDetailsCtrl, scope, routeParams;
   var postId = 5;
   var testPost = {title:"title", url:"url"};
   var postServiceMock = {
     get:function(postId){
         testPost.url = postId;
         return testPost;}
   };

    beforeEach(module('angularTestApp'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        routeParams = {postId:postId};
        PostDetailsCtrl = $controller('PostDetailsCtrl', {
            $scope:scope,
            $routeParams:routeParams,
            postService:postServiceMock
        })
    }));

    it('should read post by post id in route params', function(){
        expect(scope.post).toBe(testPost);
        expect(scope.post.url).toBe(postId);
    })
});


