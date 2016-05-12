# Unstyle 

Sometimes, really great CLIs output really colorful content, to help you easily take in and unserstand the output at a glance. And sometimes, they don't provide a way to easily get rid of the colors. And sometimes, really great CLIs use third-party tools that output pretty colors, and forget to pass through the option to print plain text. And sometimes, you just don't care and you want that text gone. And if all of those times are right now, then you have come to the right place.

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
