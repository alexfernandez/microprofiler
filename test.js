'use strict';

/**
 * Run complete package tests.
 * (C) 2014 Alex Fernández.
 */

// requires
var testing = require('testing');


/**
 * Run module tests.
 */
exports.test = function(callback)
{
	var tests = {};
	var modules = ['profiler'];
	modules.forEach(function(name)
	{
		var filename = './lib/' + name + '.js';
		tests[name] = require(filename).test;
	});
	testing.run(tests, 10000, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}

