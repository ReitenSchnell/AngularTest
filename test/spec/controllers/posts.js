'use strict';
describe('Controller: PostsController', function(){

    var PostCtrl, scope, postService, deferredSuccess;

    var testPosts = {
        "key1" : {url:'url1', title:'title1'},
        "key2" : {url:'url2', title:'title2'}};

    var postServiceMock =
    {
        get : function(){  return testPosts; },
        save : function(){ }
    };
    var saveResponse = {name:'key3'};

    beforeEach(module('angularTestApp'));

    beforeEach(inject(function($controller, $rootScope, $q){
        scope = $rootScope.$new();
        spyOn(postServiceMock, 'get').andCallThrough();
        deferredSuccess = $q.defer();
        spyOn(postServiceMock, 'save').andReturn(deferredSuccess.promise);
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

    it('should add post to array on submit', function(){
        var title = 'some title';
        scope.post.title = title;
        var url = 'ya.ru';
        scope.post.url = url;
        deferredSuccess.resolve(saveResponse);
        var initialPostCount = Object.keys(testPosts).length;

        scope.submitPost();

        scope.$apply();
        expect(scope.posts[saveResponse.name].title).toBe(title);
        expect(scope.posts[saveResponse.name].url).toBe(url);
        expect(Object.keys(scope.posts).length).toBe(initialPostCount + 1);
    });

    it('should clear post on submit', function(){
        scope.post.title = 'some title';
        scope.post.url = 'ya.ru';
        deferredSuccess.resolve(saveResponse);

        scope.submitPost();

        scope.$apply();
        expect(scope.post.title).toBe('');
        expect(scope.post.url).toBe('http://');
    });

//    it('should delete post', function(){
//        var initialPostCount = Object.keys(testPosts).length;
//        scope.deletePost(0);
//
//        expect(Object.keys(scope.posts).length).toBe(initialPostCount - 1);
//    });
});
