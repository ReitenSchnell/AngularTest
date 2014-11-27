describe('Posts', function(){
    function login() {
        element(by.id('login-link')).click();
        element(by.model('user.email')).sendKeys('vonny.puh@gmail.com');
        element(by.model('user.password')).sendKeys('123');
        element(by.id('login-btn')).click();
    }

    function removePosts(){
        browser.wait(function(){return element(by.css('.post-page')).isPresent();}, 5000);
        var deleteLinks = element.all(by.css('[ ng-click="deletePost(post)"]'));
        deleteLinks.count().then(function(count) {
            while(count > 0) {
                deleteLinks.first().click();
                count--;
            }
        })
    }

    function createPosts(postCount){
        for(var i= 1; i<=postCount; i++){
            browser.wait(function(){return element(by.css('.post-page')).isPresent();}, 5000);
            element(by.model('post.title')).sendKeys('title'+i);
            element(by.model('post.url')).sendKeys('link'+i);
            element(by.buttonText('Submit')).click();
        }
    }

    function createComments(commentsCount){
        for(var i= 1; i<=commentsCount; i++){
            element(by.model('commentText')).sendKeys('comment'+i);
            element(by.buttonText('Post Comment')).click();
        }
    }

    function logout(){
        element(by.id('logout-link')).click();
    }

    beforeEach(function(){
        browser.get('http://localhost:9000/');
        login();
        removePosts();
    });

    afterEach(function(){
       logout();
    });

    it('logged in user should create posts', function(){
        var postCount = 3;

        createPosts(postCount);

        var posts = element.all(by.repeater('post in posts'));
        expect(posts.count()).toBe(postCount);
    });

    it('logged in user should remove his posts', function(){
        var postCount = 4;
        createPosts(postCount);

        var deleteLinks = element.all(by.css('[ ng-click="deletePost(post)"]'));
        deleteLinks.first().click();
        deleteLinks.last().click();

        var posts = element.all(by.repeater('post in posts'));
        expect(posts.count()).toBe(postCount - 2);
    });

    it('logged in user should be able to leave comments', function(){
        createPosts(2);
        var commentLink = element.all(by.id('comment-link')).first();
        commentLink.click();

        var commentsCount = 3;
        createComments(commentsCount);

        var comments = element.all(by.repeater('comment in comments'));
        expect(comments.count()).toBe(commentsCount);
    })
});