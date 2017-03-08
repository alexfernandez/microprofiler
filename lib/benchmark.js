'use strict';

// requires
var microprofiler = require('./index.js');

// globals


function bare()
{
	var start = Date.now();
	for (var i = 0; i < 1e7; i++)
	{
	}
	var elapsed = Date.now() - start;
	console.log('bare: %s', elapsed);
}

function hrtime()
{
	var start = Date.now();
	for (var i = 0; i < 1e7; i++)
	{
		process.hrtime();
	}
	var elapsed = Date.now() - start;
	console.log('hrtime: %s', elapsed);
}

function dateNow()
{
	var start = Date.now();
	for (var i = 0; i < 1e7; i++)
	{
		Date.now();
	}
	var elapsed = Date.now() - start;
	console.log('dateNow: %s', elapsed);
}

function profiled()
{
	var startMs = Date.now();
	var start = microprofiler.start();
	for (var i = 0; i < 1e7; i++)
	{
		microprofiler.measureFrom(start, 'test', 1e9);
	}
	var elapsed = Date.now() - startMs;
	console.log('measureFrom: %s', elapsed);
}

bare();
hrtime();
dateNow();
profiled();

