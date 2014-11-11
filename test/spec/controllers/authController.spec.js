'use strict';
describe('Controller:AuthCtrl', function(){

    var authCtrl, scope, deferredSuccess, location;
    var authServiceMock = {
        register : function(){},
        login : function(){}
    };
    var testUser = {};

    beforeEach(module('angularTestApp'));
    beforeEach(inject(function($controller, $rootScope, $q, $location){
        scope = $rootScope.$new();
        deferredSuccess = $q.defer();
        location = $location;
        spyOn(location, 'path').andCallThrough();
        spyOn(authServiceMock, 'register').andCallThrough().andReturn(deferredSuccess.promise);
        spyOn(authServiceMock, 'login').andCallThrough().andReturn(deferredSuccess.promise);
        authCtrl = $controller('AuthCtrl', {
            $scope:scope,
            authService:authServiceMock,
            user:testUser
        })
    }));

    it('should redirect to home page when user is logged in', function(){
        expect(location.path).toHaveBeenCalledWith('/');
    });

    it('should call service register when registering user', function(){
        scope.user = testUser;
        scope.register();
        expect(authServiceMock.register).toHaveBeenCalledWith(testUser);
    });

    it('should call service login when registering user', function(){
        scope.user = testUser;
        deferredSuccess.resolve();
        scope.register();
        scope.$apply();
        expect(authServiceMock.login).toHaveBeenCalledWith(testUser);
    });

    it('should redirect to home page when registered user logged in', function(){
        scope.user = testUser;
        deferredSuccess.resolve();
        scope.register();
        scope.$apply();
        expect(location.path).toHaveBeenCalledWith('/');
    })
});
