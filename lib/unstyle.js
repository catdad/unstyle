/* jshint node: true */

function unstyleString(str) {
    return str.toString().replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '');
}

function unstyleStream(input, output) {
    input.on('data', function(chunk) {
        output.write(unstyleString(chunk));
    });
}

module.exports = {
    stream: unstyleStream,
    string: unstyleString
};
