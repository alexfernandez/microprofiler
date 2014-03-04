'use strict';

/**
 * Microprofiler.
 * (C) 2014 Alex Fernández.
 */


// requires
var Log = require('log');
var testing = require('testing');

// globals
var log = new Log('info');
var profilers = {};


/**
 * Measure from the given time, with the desired key.
 */
exports.measureFrom = function(before, key, showEvery)
{
	var elapsed = process.hrtime(before);
	if (!key)
	{
		return log.error('Missing profiler key; please specify as a second parameter');
	}
	if (!profilers[key])
	{
		profilers[key] = new Profiler(key, showEvery);
	}
	profilers[key].measure(elapsed);
};

/**
 * Measure some times, show every few requests.
 */
function Profiler(name, showEvery)
{
	// self-reference
	var self = this;

	// attributes
	var requests = 0;
	var timeUs = 0;
	showEvery = showEvery || 100000;

	/**
	 * Take a measurement, show results every few requests.
	 */
	self.measure = function(elapsed)
	{
		requests += 1;
		var diffUs = elapsed[0] * 1e6 + elapsed[1] / 1000;
		timeUs += diffUs;
		if (requests % showEvery === 0)
		{
			var meanTimeUs = (timeUs / requests).toFixed(2);
			var rps = Math.round(requests / (timeUs / 1e6));
			log.info('Profiling %s: %s requests, mean time: %s µs, rps: %s', name, requests, meanTimeUs, rps);
			requests = 0;
			timeUs = 0;
		}
	};
}

/**
 * Test the profiler.
 */
function testProfiler(callback)
{
	var runs = 100000;
	var profiler = new Profiler('first', runs);
	var before;
	for (var i = 0; i < runs; i++)
	{
		before = process.hrtime();
		profiler.measure(process.hrtime(before));
	}
	for (i = 0; i < runs; i++)
	{
		before = process.hrtime();
		exports.measureFrom(before, 'second', runs);
	}
	testing.success(callback);
}

/**
 * Run all tests.
 */
exports.test = function(callback)
{
	log.debug('Running tests');
	testing.run([testProfiler], callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}

