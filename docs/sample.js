'use strict';

/**
 * Sample use for microprofiler.
 * (C) 2014 Alex Fernández.
 */

//var profiler = require('microprofiler');
var profiler = require('../index.js');

var total = 1000000;
var s = 0;
for (var i = 0; i < total; i++)
{
	var start = process.hrtime();
	s += i;
	profiler.measureFrom(start, 'stuff', total);
}

