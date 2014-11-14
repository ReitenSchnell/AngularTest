'use strict';
describe('Controller: PostCtrl', function(){

    var PostCtrl, scope, deferredSuccess, location;
    var testPosts = {
        "key1" : {url:'url1', title:'title1'},
        "key2" : {url:'url2', title:'title2'}};

    var postServiceMock =
    {
        all : function(){  return testPosts; },
        delete: function(post) {},
        create : function(post){}
    };

    beforeEach(module('angularTestApp'));

    beforeEach(inject(function($controller, $rootScope, $q, $location){
        scope = $rootScope.$new();
        deferredSuccess = $q.defer();
        location = $location;
        spyOn(postServiceMock, 'all').andCallThrough();
        spyOn(postServiceMock, 'delete').andCallThrough();
        spyOn(postServiceMock, 'create').andCallThrough().andReturn(deferredSuccess.promise);
        spyOn(location, 'path').andCallThrough();
        PostCtrl = $controller('PostCtrl', {
            $scope:scope,
            postService:postServiceMock
        });
    }));

    it('should read posts array at startup', function(){
        expect(scope.posts).toBe(testPosts)
    });

    it('should create initial post', function(){
        expect(scope.post.title).toBe('');
        expect(scope.post.url).toBe('http://')
    });

    it('should delete post', function(){
        scope.deletePost(scope.post);
        expect(postServiceMock.delete).toHaveBeenCalledWith(scope.post);
    });
});
