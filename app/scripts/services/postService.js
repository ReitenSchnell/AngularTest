'use strict';
app.factory('postService', function($resource){
    return $resource('https://blistering-heat-2420.firebaseio.com/posts/:id.json');
});