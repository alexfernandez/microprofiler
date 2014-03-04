'use strict';

/**
 * Microprofiler: export main function.
 * (C) 2014 Alex Fernández.
 */


// requires
var profiler = require('./lib/profiler.js');

// exports
exports.start = profiler.start;
exports.measureFrom = profiler.measureFrom;

