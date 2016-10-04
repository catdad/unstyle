/* jshint node: true, mocha: true, expr: true */

var expect = require('chai').expect;
var through = require('through2');
var es = require('event-stream');
var chalk = require('chalk');

var lib = require('../');

function styleStr(str, func) {
    return str.split().map(function(char) {
        return func(char);
    }).join('');
}

describe('[unstyle]', function() {
    describe('pipe', function() {
        var STR = 'red';
        var STYLE = styleStr(STR, chalk.red.bind(chalk));
        
        it('allows a stream to be piped in and transformed', function(done) {
            var input = through();
            
            input.pipe(lib()).pipe(es.wait(function(err, data) {
                data = data.toString();
                
                expect(data).to.equal(STR);
                
                done();
            }));
            
            input.write(STR);
            input.end();
        });
        
        it('can read buffers', function(done) {
            var input = through();
            
            input.pipe(lib()).pipe(es.wait(function(err, data) {
                data = data.toString();
                
                expect(data).to.equal(STR);
                
                done();
            }));
            
            input.write(new Buffer(STR));
            input.end();
        });
    });
    
    
    describe('#stream', function() {
        var STR = 'red';
        var STYLED = styleStr(STR, chalk.red.bind(chalk));
        
        it('pipes content through to the output', function(done) {
            var input = through();
            var output = through();
            
            lib.stream(input, output);
            
            output.pipe(es.wait(function(err, data) {
                data = data.toString();
                
                expect(data).to.equal(STR + STR);
                
                done();
            }));
            
            input.write(STR);
            input.write(STR);
            input.end();
        });
        
        it('writes unstyled output to the output stream', function(done) {
            var input = through();
            var output = through();
            
            lib.stream(input, output);
            
            output.pipe(es.wait(function(err, data) {
                data = data.toString();
                
                expect(data).to.not.equal(STYLED);
                expect(data).to.equal(STR);
                
                done();
            }));
            
            input.write(STYLED);
            input.end();
        });
    });
    
    describe('#string', function() {
        
        // All the styles listed in the chalk help
        var styles = [
            'reset',    
            'bold', 
            'dim',  
            'italic',   
            'underline',    
            'inverse',  
            'hidden',   
            'strikethrough',    
            'black',    
            'red',  
            'green',    
            'yellow',   
            'blue', 
            'magenta',  
            'cyan', 
            'white',    
            'gray', 
            'bgBlack',  
            'bgRed',    
            'bgGreen',  
            'bgYellow', 
            'bgBlue',   
            'bgMagenta',    
            'bgCyan',   
            'bgWhite',  
        ];
        
        styles.forEach(function(name) {
            var func = chalk[name].bind(chalk);
            
            var STR = 'cat';
            var STYLED = styleStr(STR, func);
            
            it('returns an unstyled string when styled as ' + name, function() {
                var val = lib.string(STYLED);
                
                expect(STR).to.not.equal(STYLED);
                expect(val).to.not.equal(STYLED);
                expect(val).to.equal(STR);
            });
        });
        
    });
});
