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

function streamTest(writeFunc, onDone) {
    var strOrig = 'red';
    var strIn = styleStr(strOrig, chalk.red.bind(chalk));
    
    var input = through();
    var output = through();
    
    output.pipe(es.wait(function (err, data) {
        if (err) {
            return onDone(err);
        }
        
        var strOut = data.toString();
        
        expect(strOut).to.not.equal(strIn);
        expect(strOut).to.equal(strOrig);
        
        onDone();
    }));
    
    writeFunc(input, output);
    
    input.write(strIn);
    input.end();
}

function addStreamTests(writeFunc) {
    it('unstyles styled strings');
    
    it('unstyles styles buffers');
    
    it('handles multiple asynchronous writes');
}

describe('[unstyle]', function() {
    describe('pipe', function() {
        var STR = 'red';
        var STYLE = styleStr(STR, chalk.red.bind(chalk));
        
        function writeFunc(input, output) {
            input.pipe(lib()).pipe(output);
        }
        
        it('allows a stream to be piped in and transformed', function(done) {
            streamTest(writeFunc, done);
        });
        
        it('can read buffers', function(done) {
            var input = through();
            
            input.pipe(lib()).pipe(es.wait(function(err, data) {
                if (err) {
                    return done(err);
                }
                
                data = data.toString();
                
                expect(data).to.equal(STR);
                
                done();
            }));
            
            input.write(new Buffer(STR));
            input.end();
        });
        
        addStreamTests();
    });
    
    
    describe('#stream', function() {
        var STR = 'red';
        var STYLED = styleStr(STR, chalk.red.bind(chalk));
        
        function writeFunc(input, output) {
            lib.stream(input, output);
        }
        
        it('writes unstyled output to the output stream', function(done) {
            streamTest(writeFunc, done);
        });
        
        addStreamTests();
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
