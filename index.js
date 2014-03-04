'use strict';

/**
 * Microprofiler: export main function.
 * (C) 2014 Alex Fernández.
 */


// requires
require('prototypes');
var profiler = require('./lib/profiler.js');

// exports
exports.overwriteWith(profiler);

