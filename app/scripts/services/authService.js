'use strict';
app.factory('authService', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $firebase){
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(ref);

    var authService = {
        register : function(user){
            return auth.$createUser(user.email, user.password);
        },
        login: function(user){
            return auth.$login('password', user);
        },
        logout : function(){
            auth.$logout();
        },
        resolveUser : function(){
            return auth.$getCurrentUser();
        },
        signedIn : function(){
            return !!authService.currentUser.provider;
        },
        createProfile : function(user) {
            var profile = {
                username: user.username,
                md5_hash: user.md5_hash
            };
            var profileRef = $firebase(ref.child('profile'));
            return profileRef.$set(user.uid, profile)
        },
        currentUser : {}
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, firebaseUser){
        angular.copy(firebaseUser, authService.currentUser);
        authService.currentUser.profile = $firebase(ref.child('profile').child(authService.currentUser.uid)).$asObject();
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function(){
        if(authService.currentUser && authService.currentUser.profile){
            authService.currentUser.profile.$destroy();
        }
        angular.copy({}, authService.currentUser);
    });

    return authService;
});