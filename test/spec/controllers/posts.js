'use strict';
describe('Controller: PostsController', function(){

    beforeEach(module('angularTestApp'));
    var PostCtrl, scope, postService, testPosts;

    beforeEach(function(){
        var mockPostService = {};
        testPosts = [{url:'url1', title:'title1'}];
        module('angularTestApp', function($provide){
            $provide.value('postService', mockPostService);
        });
        inject(function($q){
//            mockPostService.data = testPosts;
            mockPostService.get = function(){
//                var defer = $q.defer();
//                defer.resolve(this.data);
//                return defer.promise;
                return testPosts;
            }
        })
    });

    beforeEach(inject(function($controller, $rootScope, _postService_){
        scope = $rootScope.$new();
        postService = _postService_;
        PostCtrl = $controller('PostCtrl', {
            $scope:scope,
            postService:postService
        });
        scope.$digest();
    }));

    it('should read posts array at startup', function(){
        expect(scope.posts.length).toBe(testPosts.length)
    });

//    it('should create initial post', function(){
//        expect(scope.post.title).toBe('');
//        expect(scope.post.url).toBe('http://')
//    });
//
//    it('should add post to array on submit', function(){
//        var title = 'some title';
//        scope.post.title = title;
//        var url = 'ya.ru';
//        scope.post.url = url;
//
//        scope.submitPost();
//
//        expect(scope.posts[0].title).toBe(title);
//        expect(scope.posts[0].url).toBe(url);
//        expect(scope.posts.length).toBe(1);
//    });
//
//    it('should clear post on submit', function(){
//        scope.post.title = 'some title';
//        scope.post.url = 'ya.ru';
//
//        scope.submitPost();
//
//        expect(scope.post.title).toBe('');
//        expect(scope.post.url).toBe('http://');
//    });
//
//    it('should delete post', function(){
//        scope.post.title = 'some title';
//        scope.post.url = 'ya.ru';
//        scope.submitPost();
//
//        scope.deletePost(0);
//
//        expect(scope.posts.length).toBe(0);
//    });
});
