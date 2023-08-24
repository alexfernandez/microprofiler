import testing from 'testing'
import {start, measureFrom, getProfiler, Profiler} from '../lib/profiler.js'

// globals
var enabled = true;


/**
 * Test how long profiling takes.
 */
function testProfilingProfiler(callback)
{
	var runs = 10000;
	for (var i = 0; i < runs; i++)
	{
		var now = start();
		measureFrom(now, 'fake');
		measureFrom(now, 'profile');
	}
	var stats = getStats('profile');
	testing.assert(stats.meanTimeUs < 5, 'Profiling should take less than 5 µs, took: ' + stats.meanTimeUs, callback);
	testing.success(callback);
}

/**
 * Show profiling data for a key.
 */
export function show(key, showEvery) {
	if (!enabled) {
		return;
	}
	getProfiler(key, showEvery).show();
}

/**
 * Get an object with stats.
 */
export function getStats(key, showEvery) {
	return getProfiler(key, showEvery).getStats(key);
}

/**
 * Disable the whole module.
 */
export function disable() {
	enabled = false;
}

/**
 * Test the profiler.
 */
function testProfiler(callback)
{
	var runs = 100000;
	var now = start();
	var profiler = new Profiler('first');
	var before;
	for (var i = 0; i < runs; i++)
	{
		before = start();
		const elapsedUs = measureFrom(before);
		testing.assert(elapsedUs, 'measureFrom() should return something', callback);
		profiler.measure(elapsedUs);
	}
	var stats = profiler.getStats();
	testing.assert(stats, 'No profiler stats', callback);
	testing.assert(stats.timeUs, 'Profiler stats should not be zero', callback);
	for (i = 0; i < runs; i++)
	{
		before = start();
		const elapsedUs = measureFrom(before, 'second', runs);
		testing.assert(elapsedUs, 'measureFrom() should not decrease', callback);
	}
	var fromStart = measureFrom(now, 'fromStart');
	testing.assert(fromStart, 'measureFrom() start should not be zero', callback);
	testing.success(callback);
}

export function test(callback) {
	testing.run([
		testProfilingProfiler,
		testProfiler,
	], callback);
}

