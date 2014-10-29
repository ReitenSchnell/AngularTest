'use strict';
describe('Service: postService', function()
{
    beforeEach(module('angularTestApp'));

    it('check the existence of service', inject(function(postService){
        expect(postService).toBeDefined();
    }))
});