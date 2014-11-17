'use strict';
describe('Controller: PostDetailsCtrl', function(){
   var PostDetailsCtrl, scope, routeParams;
   var postId = 5;
   var testPost = {title:"title", url:"url"};

   var commentsMock = {
       $add : function () {}
   };

   var postServiceMock = {
     get:function(){},
     comments: function(){}
   };

    var testUser = {uid: 'some id', profile: {username: 'some name'}};

    var authServiceMock = {
       currentUser : testUser,
       signedIn : function(){}
   };

    beforeEach(module('angularTestApp'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        routeParams = {postId:postId};

        spyOn(postServiceMock, 'get').andReturn(testPost);
        spyOn(postServiceMock, 'comments').andReturn(commentsMock);
        spyOn(commentsMock, '$add');
        spyOn(authServiceMock, 'signedIn');

        PostDetailsCtrl = $controller('PostDetailsCtrl', {
            $scope: scope,
            $routeParams: routeParams,
            postService: postServiceMock,
            authService: authServiceMock
        })
    }));

    it('should read post by post id in route params', function(){
        expect(scope.post).toBe(testPost);
        expect(postServiceMock.get).toHaveBeenCalledWith(postId);
    });

    it('should read comments to the post', function(){
        expect(scope.comments).toBe(commentsMock);
        expect(postServiceMock.comments).toHaveBeenCalledWith(postId);
    });

    it('should read current user from auth service', function(){
        expect(scope.user).toBe(authServiceMock.currentUser);
    });

    it('should store link to signed in', function(){
        scope.signedIn();
        expect(authServiceMock.signedIn).toHaveBeenCalled();
    });

    describe('comments', function(){
        it('should not add comment when it is empty', function(){
            scope.commentText = '';
            scope.addComment();
            expect(scope.comments.$add.callCount).toBe(0);
        });

        it('should not add comment when text does not exist', function(){
            scope.addComment();
            expect(scope.comments.$add.callCount).toBe(0);
        });

        it('should add comment with comment text', function(){
            var commentText = 'some text';
            scope.commentText = commentText;
            scope.addComment();
            expect(scope.comments.$add).toHaveBeenCalledWith({
                text:commentText,
                creator:testUser.profile.username,
                creatorId : testUser.uid})
        });

        it('should clear comment text after adding', function(){
            scope.commentText = 'some text';
            scope.addComment();
            expect(scope.commentText).toBe('')
        })
    })
});


