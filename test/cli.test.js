/* jshint node: true, mocha: true, expr: true */

var path = require('path');
var util = require('util');
var pkg = require('../package.json');

var expect = require('chai').expect;
var through = require('through2');
var chalk = require('chalk');
var shellton = require('shellton');

var CLI_PATH = path.join(__dirname, '..', pkg.bin.unstyle);
var CLI =  util.format('node %s', CLI_PATH);
var ENV_PATH = path.dirname(process.execPath);
var ENV = {
    PATH: ENV_PATH
};

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
            cwd: __dirname,
            env: ENV
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
            cwd: __dirname,
            env: ENV
        }, function(err, stdout, stderr) {
            expect(err).to.not.be.ok;
            
            expect(stdout.trim()).to.not.equal(COLORED_STR);
            expect(stdout.trim()).to.equal(STR);
            
            done();
        });
        
        stdin.write(COLORED_STR);
        stdin.end();
    });
    
    describe('reports the version number', function() {
        var VERSION = pkg.version;
        
        function createVersionTest(flag) {
            return function(done) {
                shellton({
                    task: CLI + ' ' + flag,
                    cwd: __dirname,
                    env: ENV
                }, function (err, stdout, stderr) {
                    if (err) {
                        return done(err);
                    }
                    
                    expect(stdout).to.equal('v' + VERSION + '\n');
                    expect(stderr).to.equal('');
                    
                    done();
                });
            };
        }
        
        it('when using the --version flag', createVersionTest('--version'));
        
        it('when using the -v flag', createVersionTest('-v'));
    });

});
