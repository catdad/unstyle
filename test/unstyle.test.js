/* jshint node: true, mocha: true, expr: true, unused: true */

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

function createStreamTest(expected, writeFunc, onDone) {
    var input = through();
    var output = through();
    
    output.pipe(es.wait(function (err, data) {
        if (err) {
            return onDone(err);
        }
        
        var strOut = data.toString();
        
        expect(strOut).to.equal(expected);
        
        onDone();
    }));
    
    writeFunc(input, output);
    
    return input;
}

function addStreamTests(writeFunc) {
    it('unstyles styled strings', function(done) {
        var STR = 'pineapples';
        var styled = chalk.red(STR);
        
        expect(styled).to.not.equal(STR);
        
        var stream = createStreamTest(STR, writeFunc, done);
        
        stream.write(styled);
        stream.end();
    });
    
    it('unstyles styled buffers', function(done) {
        var STR = 'pineapples';
        var styled = chalk.red(STR);
        
        expect(styled).to.not.equal(STR);
        
        var stream = createStreamTest(STR, writeFunc, done);
        
        stream.write(new Buffer(styled));
        stream.end();
    });
    
    it('handles multiple asynchronous writes', function(done) {
        var WRITES = 3;
        var STR = 'pineapples';
        var styled = chalk.red(STR);

        expect(styled).to.not.equal(STR);
        
        var stream = createStreamTest(STR + STR + STR, writeFunc, done);
        
        function write(count) {
            if (count < WRITES) {
                setTimeout(function() {
                    stream.write(styled);
                    write(count + 1);
                }, 1);
            } else {
                stream.end();
            }
        }
        
        write(0);
    });
}

describe('[unstyle]', function() {
    describe('pipe', function() {
        addStreamTests(function writeFunc(input, output) {
            input.pipe(lib()).pipe(output);
        });
    });
    
    
    describe('#stream', function() {
        addStreamTests(function writeFunc(input, output) {
            lib.stream(input, output);
        });
    });
    
    describe('#string', function() {
        
        it('unstyles a string parameter');
        
        it('unstyles a buffer parameter');
        
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
