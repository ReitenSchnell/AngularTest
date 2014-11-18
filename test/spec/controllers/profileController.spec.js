'use strict';
describe('Controllers:ProfileCtrl', function(){
    var profileCtrl, scope, routeParams, deferredSuccess;
    var testProfile;
    var profileServiceMock = {
        get : function(){},
        getPosts: function(){}
    };
    beforeEach(module('angularTestApp'));
    beforeEach(inject(function($controller, $rootScope, $q){
        scope = $rootScope.$new();
        routeParams = {userId : '111'};
        testProfile = {profileId: routeParams.userId};
        deferredSuccess = $q.defer();
        spyOn(profileServiceMock, 'get').andReturn(testProfile);
        spyOn(profileServiceMock, 'getPosts').andReturn(deferredSuccess.promise);
        profileCtrl = $controller('ProfileCtrl', {
            $scope : scope,
            $routeParams : routeParams,
            profileService : profileServiceMock
        })
    }));

    it('should assign current profile to the profile of user', function(){
        expect(scope.profile).toBe(testProfile);
    });

    it('should assign posts list to current user posts', function(){
        var posts = ['post1', 'post2'];
        deferredSuccess.resolve(posts);
        scope.$apply();
        expect(scope.posts).toBe(posts);
    })

});