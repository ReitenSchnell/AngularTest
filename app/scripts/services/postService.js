'use strict';
app.factory('postService', function($firebase, FIREBASE_URL){
    var ref = new Firebase(FIREBASE_URL);
    var posts = $firebase(ref.child('posts')).$asArray();

    var postService = {
        all : posts,
        create: function(post){
            return posts.$add(post);
        },
        get: function(postId){
            return $firebase(ref.child('posts').child(postId)).$asObject();
        },
        delete: function(post){
            return posts.$remove(post);
        }
    };

    return postService;
});