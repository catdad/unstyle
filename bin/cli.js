#!/usr/bin/env node
/* jshint node: true */

var unstyle = require('../unstyle.js');

unstyle.stream(process.stdin, process.stdout);
