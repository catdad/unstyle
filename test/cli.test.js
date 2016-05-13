/* jshint node: true, mocha: true, expr: true */

var path = require('path');
var util = require('util');
var pkg = require('../package.json');

var expect = require('chai').expect;
var through = require('through2');
var chalk = require('chalk');
var shellton = require('shellton');

var rel = path.join(__dirname, '..');
var cliPath = path.join(rel, pkg.bin.unstyle);

var CLI =  util.format('node %s', cliPath);

var STR = 'red';
var COLORED_STR = (function(str) {
    return str.split().map(function(char) {
        return chalk.red(char);
    }).join('');
})(STR);

describe('[cli]', function() {
    it('echoes piped in content', function(done) {
        var stdin = through();
        
        shellton({
            task: CLI,
            stdin: stdin,
            cwd: __dirname
        }, function(err, stdout, stderr) {
            expect(err).to.not.be.ok;
            
            expect(stdout.trim()).to.equal(STR);
            
            done();
        });
        
        stdin.write(STR);
        stdin.end();
    });
    
    it('outputs unescaped content', function(done) {
        var stdin = through();
        
        shellton({
            task: CLI,
            stdin: stdin,
            cwd: __dirname
        }, function(err, stdout, stderr) {
            expect(err).to.not.be.ok;
            
            expect(stdout.trim()).to.not.equal(COLORED_STR);
            expect(stdout.trim()).to.equal(STR);
            
            done();
        });
        
        stdin.write(COLORED_STR);
        stdin.end();
    });

});
