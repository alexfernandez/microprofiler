
[![Build Status](https://secure.travis-ci.org/alexfernandez/microprofiler.png)](http://travis-ci.org/alexfernandez/microprofiler)

[![NPM](https://nodei.co/npm/microprofiler.png)](https://nodei.co/npm/microprofiler/)

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

The library has been designed to be dead simple to use.
First require use of microprofiler:

    var microprofiler = require('microprofiler');

Locate a portion of code you want to measure. Insert a measurement before it starts:

    var start = microprofiler.start();

The function `microprofiler.start()` is simply an alias to `process.hrtime()`,
which returns time with nanosecond precision.

To simply measure the number of microseconds elapsed in the block of code,
insert a call to `measureFrom()` passing only the `start`:

    var elapsedUs = microprofiler.measureFrom(start);

Optionally you may want the microprofiler to keep track of time,
then pass a key as the optional second parameter:

    microprofiler.measureFrom(start, 'code');

To show current stats for a given key on demand, use `microprofiler.show()`:

    microprofiler.show('code');

A line similar to this will be shown:

    [Tue Mar 04 2014 01:40:17 GMT+0100 (CET)] INFO Profiling code: 1000 requests, mean time: 105.76 µs, rps: 9455

Even simpler, you can also pass an optional number of requests after which stats will be shown:

    microprofiler.measureFrom(start, 'code', 1000);

Now the stats will be shown automatically after 1000 requests.

That is really all there is to it.
The functions above can be used in asynchronous code without problems.

## Measuring Performance

Each measurement should take less about one microsecond to perform.
(It would be better to have it take less than one microsecond,
but just calling `process.hrtime()` twice takes longer than that
so it is not possible.)
The library is therefore accurate to within two microseconds.

Given that the impact of profiling is low but not zero, the whole module
can be disabled with `microprofiler.disable()`:

    microprofiler.disable();

To get stats from your code just call `microprofiler.getStats()`:

    var stats = microprofiler.getStats('code');

It will return an object with current stats info, like this:

    {
        "key":"code",
        "requests":10000,
        "timeUs":9193.090999999931,
        "meanTimeUs":"0.92",
        "rps":1087773
    }

## Example

Suppose we want to measure how long the following bit of code takes.

    var string = '';
    var total = 0;
    for (var i = 0; i < 100; i++)
    {
        string += i;
        total += parseInt(string);
    }

We can just add a couple of lines before and after it:

    var microprofiler = require('microprofiler');

    var start = microprofiler.start();
    ... [profiled code goes here]
    microprofiler.measureFrom(start, 'loop', 10000);

Now every time that code is executed a measure is taken and stored; after 10000 runs
the microprofiler will show gathered results.

Multiple measurements can be taken:


    var microprofiler = require('microprofiler');

    var start = microprofiler.start();
    ... [first block of profiled code goes here]
    microprofiler.measureFrom(start, 'first', 10000);
    ... [more profiled code]
    microprofiler.measureFrom(start, 'second', 10000);
    ... [even more profiled code]
    microprofiler.measureFrom(start, 'third', 10000);

Now two intermediate measurements are taken.

To run in a synthetic test just stick the whole thing in a second loop:

    var microprofiler = require('microprofiler');
    var rounds = 10000;

    for (var index = 0; index < rounds; index++)
    {
        var start = microprofiler.start();
        ... [profiled code goes here]
        microprofiler.measureFrom(start, 'loop', rounds);
    }

It will run the code, profile it, and show the results at the end.

Also see the [sample in the repo](https://github.com/alexfernandez/microprofiler/blob/master/lib/sample.js).

## License

(The MIT License)

Copyright (c) 2013 Alex Fernández <alexfernandeznpm@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

