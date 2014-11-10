'use strict';
describe('Filters:hostNameFromUrl', function(){
    var filter;
    beforeEach(module('angularTestApp'));
    beforeEach(inject(function($filter){
        filter = $filter('hostNameFromUrl');
    }));

    it('should return hostname from url', function(){
        var result = filter('http://www.yandex.ru/some_link');
        expect(result).toBe('www.yandex.ru');
    })
});
