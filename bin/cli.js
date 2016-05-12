#!/usr/bin/env node
/* jshint node: true */

var unstyle = require('../lib/unstyle.js');

unstyle.stream(process.stdin, process.stdout);
