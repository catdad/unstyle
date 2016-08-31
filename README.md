# Unstyle

[![Build][1]][2]
[![Test Coverage][3]][4]
[![Code Climate][5]][6]
[![Downloads][7]][8]
[![Version][9]][8]
[![Dependency Status][10]][11]

[1]: https://travis-ci.org/catdad/unstyle.svg?branch=master
[2]: https://travis-ci.org/catdad/unstyle

[3]: https://codeclimate.com/github/catdad/unstyle/badges/coverage.svg
[4]: https://codeclimate.com/github/catdad/unstyle/coverage

[5]: https://codeclimate.com/github/catdad/unstyle/badges/gpa.svg
[6]: https://codeclimate.com/github/catdad/unstyle

[7]: https://img.shields.io/npm/dm/unstyle.svg
[8]: https://www.npmjs.com/package/unstyle
[9]: https://img.shields.io/npm/v/unstyle.svg

[10]: https://david-dm.org/catdad/unstyle.svg
[11]: https://david-dm.org/catdad/unstyle

Sometimes, really great CLIs output really colorful content, to help you easily take in and unserstand the output at a glance. And sometimes, they don't provide a way to easily get rid of the colors. And sometimes, really great CLIs use third-party tools that output pretty colors, and forget to pass through the option to print plain text. And sometimes, you just don't care and you want those colors gone. And if all of those times are right now, then you have come to the right place.

## Install

```bash
npm install --global unstyle
```

## Profit

```bash
colorful-command | unstyle > output.txt
```

## But I just want to do it inside my app.

```javascript
var unstyle = require('unstyle');
unstyle.stream(inputStream, outputStream);
```

## What are streams? I have a string.

```javascript
var unstyle = require('unstyle');
var cleanString = unstyle.string(dirtyString);
```

## But do you have a stream I can just pipe through?

```javascript
var unstyle = require('unstyle');
inputStream.pipe(unstyle()).pipe(outputStream);
```
