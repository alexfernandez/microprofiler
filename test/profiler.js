import testing from 'testing'
import {start, measureFrom, getProfiler, Profiler} from '../lib/profiler.js'

// globals
let enabled = true;


/**
 * Test how long profiling takes.
 */
function testProfilingProfiler(callback)
{
	const runs = 10000;
	for (let i = 0; i < runs; i++)
	{
		const now = start();
		measureFrom(now, 'fake');
		measureFrom(now, 'profile');
	}
	const stats = getStats('profile');
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
	const runs = 100000;
	const now = start();
	const profiler = new Profiler('first');
	let before;
	for (let i = 0; i < runs; i++)
	{
		before = start();
		const elapsedUs = measureFrom(before);
		testing.assert(elapsedUs, 'measureFrom() should return something', callback);
		profiler.measure(elapsedUs);
	}
	const stats = profiler.getStats();
	testing.assert(stats, 'No profiler stats', callback);
	testing.assert(stats.timeUs, 'Profiler stats should not be zero', callback);
	for (let i = 0; i < runs; i++)
	{
		before = start();
		const elapsedUs = measureFrom(before, 'second', runs);
		testing.assert(elapsedUs, 'measureFrom() should not decrease', callback);
	}
	const fromStart = measureFrom(now, 'fromStart');
	testing.assert(fromStart, 'measureFrom() start should not be zero', callback);
	testing.success(callback);
}

export function test(callback) {
	testing.run([
		testProfilingProfiler,
		testProfiler,
	], callback);
}

