/* jshint node: true */

var through = require('through2');

function isStdStream(stream) {
    return stream === process.stdin ||
           stream === process.stdout ||
           stream === process.stderr;
}

function unstyleString(str) {
    return str.toString().replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '');
}

function unstyleStream(input, output) {
    input.on('data', function(chunk) {
        output.write(unstyleString(chunk));
    });
    
    if (!isStdStream(output)) {
        input.on('end', function() {
            output.end();
        });    
    }
}

function unstyle() {
    return through(function(chunk, enc, cb) {
        cb(null, unstyleString(chunk.toString()));
    });
}

module.exports = unstyle;
module.exports.stream = unstyleStream;
module.exports.string = unstyleString;
