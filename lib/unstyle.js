/* jshint node: true */

var through = require('through2');
var eolFix = require('eol-fix-stream');

function unstyleString(str) {
    return str.toString().replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '');
}

function unstyle() {
    return through(function(chunk, enc, cb) {
        cb(null, unstyleString(chunk.toString()));
    });
}

function unstyleStream(input, output) {
    input
        .pipe(unstyle())
        .pipe(eolFix())
        .pipe(output);
}

module.exports = unstyle;
module.exports.stream = unstyleStream;
module.exports.string = unstyleString;
