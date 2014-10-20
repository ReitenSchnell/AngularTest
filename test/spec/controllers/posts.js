describe('Controller: PostsController', function(){

    beforeEach(module('angularTestApp'));
    var PostCtrl, scope;

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        PostCtrl = $controller('PostCtrl', {
            $scope:scope
        });
    }));

    it('should create posts array', function(){
        expect(scope.posts.length).toBe(0)
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

        scope.submitPost();

        expect(scope.posts[0].title).toBe(title);
        expect(scope.posts[0].url).toBe(url);
        expect(scope.posts.length).toBe(1);
    });

    it('should clear post on submit', function(){
        scope.post.title = 'some title';
        scope.post.url = 'ya.ru';

        scope.submitPost();

        expect(scope.post.title).toBe('');
        expect(scope.post.url).toBe('http://');
    });

    it('should delete post', function(){
        scope.post.title = 'some title';
        scope.post.url = 'ya.ru';
        scope.submitPost();

        scope.deletePost(0);

        expect(scope.posts.length).toBe(0);
    });
});
