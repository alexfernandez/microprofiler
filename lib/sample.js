import * as profiler from './profiler.js'


/**
 * For the first 1000 numbers: concatenate with '', convert to integer and add to total.
 */
function code() {
	var string = '';
	var total = 0;
	for (var i = 0; i < 100; i++)
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
	var runs = 10000;
	for (var i = 0; i < runs; i++)
	{
		var start = profiler.start();
		code();
		profiler.measureFrom(start, 'code', runs);
	}

}

profile();

