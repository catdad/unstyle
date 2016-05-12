/* jshint node: true, mocha: true, expr: true */

var expect = require('chai').expect;
var through = require('through2');
var es = require('event-stream');
var chalk = require('chalk');

var lib = require('../lib/unstyle.js');

var STR = 'red';
var COLORED_STR = (function(str) {
    return str.split().map(function(char) {
        return chalk.red(char);
    }).join('');
})(STR);

describe('[unstyle]', function() {
    describe('#stream', function() {
        it('writes unstyled output to the output stream', function(done) {
            var input = through();
            var output = through();
            
            lib.stream(input, output);
            
            var dataArr = [];
            
            output.pipe(es.wait(function(err, data) {
                data = data.toString();
                
                expect(data).to.not.equal(COLORED_STR);
                expect(data).to.equal(STR);
                
                done();
            }));
            
            input.write(COLORED_STR);
            input.end();
        });
    });
    
    describe('#string', function() {
        it('returns an unstyled string', function() {
            var val = lib.string(COLORED_STR);
            
            expect(val).to.not.equal(COLORED_STR);
            expect(val).to.equal(STR);
        });
    });
});
