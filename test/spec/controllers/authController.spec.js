'use strict';
describe('Controller:AuthCtrl', function(){
    var authCtrl, scope, deferredSuccess, location;
    var authServiceMock = {
        register : function(){},
        login : function(){}
    };
    var testUser = {};

    beforeEach(module('angularTestApp'));

    describe('user is logged in', function(){
        beforeEach(inject(function($controller, $rootScope, $q, $location){
            scope = $rootScope.$new();
            location = $location;
            spyOn(location, 'path').andCallThrough();
            authCtrl = $controller('AuthCtrl', {
                $scope: scope,
                authService: authServiceMock,
                user: testUser
            });
        }));

        it('should redirect to home page when user is logged in', function(){
            expect(location.path).toHaveBeenCalledWith('/');
        });
    });

    describe('registering user', function(){
        beforeEach(inject(function($controller, $rootScope, $q, $location){
            scope = $rootScope.$new();
            deferredSuccess = $q.defer();
            location = $location;
            spyOn(location, 'path').andCallThrough();
            spyOn(authServiceMock, 'register').andCallThrough().andReturn(deferredSuccess.promise);
            spyOn(authServiceMock, 'login').andCallThrough().andReturn(deferredSuccess.promise);
            authCtrl = $controller('AuthCtrl', {
                $scope: scope,
                authService: authServiceMock,
                user: null
            });
        }));

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
        });

    });

    describe ('user login', function(){
        beforeEach(inject(function($controller, $rootScope, $q, $location){
            scope = $rootScope.$new();
            deferredSuccess = $q.defer();
            location = $location;
            spyOn(location, 'path').andCallThrough();
            spyOn(authServiceMock, 'login').andCallThrough().andReturn(deferredSuccess.promise);
            authCtrl = $controller('AuthCtrl', {
                $scope: scope,
                authService: authServiceMock,
                user: null
            });
        }));

        it('should call service login when logging in user', function(){
            scope.user = testUser;
            scope.login();
            expect(authServiceMock.login).toHaveBeenCalledWith(testUser);
        });

        it('should redirect user to home page after login', function(){
            scope.user = testUser;
            deferredSuccess.resolve();
            scope.login();
            scope.$apply();
            expect(location.path).toHaveBeenCalledWith('/');
        })
    });
});
