#!/usr/bin/env node
/* jshint node: true */

var eolFix = require('eol-fix-stream');

var unstyle = require('../');

function arrContains(arr, val) {
    return arr.indexOf(val) > -1;
}

function checkVersionCommand() {
    var argv = [].slice.call(process.argv);
    return arrContains(argv, '-v') ||
        arrContains(argv, '--version');
}

if (checkVersionCommand()) {
    var pkg = require('../package.json');
    console.log('v%s', pkg.version);
    process.exit(0);
}

process.stdin
    .pipe(unstyle())
    .pipe(eolFix())
    .pipe(process.stdout);
