
[![Build Status](https://secure.travis-ci.org/alexfernandez/microprofiler.png)](http://travis-ci.org/alexfernandez/microprofiler)

# microprofiler

Low-level profiling for node.js: squeeze those microseconds!

Microprofiler allows you to measure performance of your code down to the level of the microsecond,
allowing micro-optimizations that are unfeasible any other way.

Instead of blind profiling your entire code, insert probes whenever needed and measure only
at interesting points.

## Installation

Simply install from npm:

    $ npm install microprofiler

Or add to your package.json as a dependency.

## Usage

First require use of microprofiler:

    var profiler = require('microprofiler');

Locate a portion of code you want to measure. Insert a measurement before it starts:

    var start = profiler.start();

The function `profiler.start()` is simply an alias to `process.hrtime()`,
which returns time with nanosecond precision.

After the block of code ends, insert a measurement passing a key:

    profiler.measureFrom(start, 'code');

Optionally pass a number of requests after which a trace will be shown.

To show current stats for a given key, use `profiler.show()`:

    profiler.show('code');

That is really all there is to it.

## License

(The MIT License)

Copyright (c) 2013 Alex Fernández <alexfernandeznpm@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

