'use strict';

describe('Controller:NavCtrl', function(){
    var NavCtrl, scope, deferredSuccess, location;

    var postServiceMock =
    {
        create : function(post){}
    };

    var testUser = {uid:'some id', profile:{username:"some name"}};

    var authServiceMock =
    {
        logout : function(){},
        signedIn : function(){},
        currentUser: testUser
    };

    var saveResponse = {name:function(){return 'key3'}};
    beforeEach(module('angularTestApp'));
    beforeEach(inject(function($controller, $rootScope, $q, $location){
        scope = $rootScope.$new();
        deferredSuccess = $q.defer();
        location = $location;
        spyOn(postServiceMock, 'create').andCallThrough().andReturn(deferredSuccess.promise);
        spyOn(location, 'path').andCallThrough();
        spyOn(authServiceMock, 'logout').andCallThrough();
        spyOn(authServiceMock, 'signedIn').andCallThrough();
        NavCtrl = $controller('NavCtrl', {
            $scope:scope,
            postService:postServiceMock,
            authService:authServiceMock
        });
    }));

    it('should create initial post', function(){
        expect(scope.post.title).toBe('');
        expect(scope.post.url).toBe('http://')
    });

    it('should call create', function(){
        scope.submitPost();
        expect(postServiceMock.create).toHaveBeenCalledWith(scope.post);
    });

    it('should assign user name to post before create', function(){
        scope.submitPost();
        expect(scope.post.creator).toBe(testUser.profile.username);
    });

    it('should assign user id to post before create', function(){
        scope.submitPost();
        expect(scope.post.creatorId).toBe(testUser.uid);
    });

    it('should clear post on submit', function(){
        scope.post.title = 'some title';
        scope.post.url = 'some url';
        deferredSuccess.resolve(saveResponse);

        scope.submitPost();

        scope.$apply();
        expect(scope.post.title).toBe('');
        expect(scope.post.url).toBe('http://');
    });

    it('should redirect to post comments after create', function(){
        deferredSuccess.resolve(saveResponse);
        scope.submitPost();
        scope.$apply();
        expect(location.path).toHaveBeenCalledWith('/posts/key3');
    });

    it('should call auth service logout', function(){
        scope.logout();
        expect(authServiceMock.logout).toHaveBeenCalled();
    });

    it('should call auth service signedIn', function(){
        scope.signedIn();
        expect(authServiceMock.signedIn).toHaveBeenCalled();
    });

    it('should bind auth service currentUser to user', function(){
        expect(scope.user).toBe(testUser);
    })
});