'use strict';

/**
 * Microprofiler sample.
 * (C) 2014 Alex Fernández.
 */


// requires
require('prototypes');
var profiler = require('./profiler');
var Log = require('log');

// globals
var log = new Log('info');


/**
 * For the first 1000 numbers: concatenate with '', convert to integer and add to total.
 */
function code()
{
	var string = '';
	var total = 0;
	for (var i = 0; i < 100; i++)
	{
		string += i;
		total += parseInt(string);
	}
}

/**
 * Measure how long the above function takes.
 */
function profile()
{
	var runs = 10000;
	log.debug('Profiling for %s runs', runs);
	for (var i = 0; i < runs; i++)
	{
		var start = profiler.start();
		code();
		profiler.measureFrom(start, 'code', runs);
	}

}

// profile if invoked directly
if (__filename == process.argv[1])
{
	profile();
}

