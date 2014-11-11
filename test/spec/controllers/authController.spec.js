'use strict';
describe('Controller:AuthCtrl', function(){

    var authCtrl, scope, deferredSuccess, location;
    var authServiceMock = {};
    var testUser = {};

    beforeEach(module('angularTestApp'));
    beforeEach(inject(function($controller, $rootScope, $q, $location){
        scope = $rootScope.$new();
        deferredSuccess = $q.defer();
        location = $location;
        spyOn(location, 'path').andCallThrough();
        authCtrl = $controller('AuthCtrl', {
            $scope:scope,
            authService:authServiceMock,
            user:testUser
        })
    }));

    it('should redirect to home page when user is logged in', function(){
        expect(location.path).toHaveBeenCalledWith('/');
    })
});
