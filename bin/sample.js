import * as profiler from '../index.js'


/**
 * For the first 1000 numbers: concatenate with '', convert to integer and add to total.
 */
function code() {
	let string = '';
	let total = 0;
	for (let i = 0; i < 100; i++)
	{
		string += i;
		total += parseInt(string);
	}
	return total.length
}

/**
 * Measure how long the above function takes.
 */
function profile() {
	const runs = 10000;
	for (let i = 0; i < runs; i++)
	{
		const start = profiler.start();
		code();
		profiler.measureFrom(start, 'code', runs);
	}

}

profile();

