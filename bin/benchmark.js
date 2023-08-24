import microprofiler from '../index.js'


function bare() {
	const start = Date.now();
	for (let i = 0; i < 1e7; i++) {
		// do nothing
	}
	const elapsed = Date.now() - start;
	console.log('bare: %s', elapsed);
}

function hrtime() {
	const start = Date.now();
	for (let i = 0; i < 1e7; i++) {
		process.hrtime();
	}
	const elapsed = Date.now() - start;
	console.log('hrtime: %s', elapsed);
}

function dateNow() {
	const start = Date.now();
	for (let i = 0; i < 1e7; i++) {
		Date.now();
	}
	const elapsed = Date.now() - start;
	console.log('dateNow: %s', elapsed);
}

function profiled() {
	const startMs = Date.now();
	const start = microprofiler.start();
	for (let i = 0; i < 1e7; i++) {
		microprofiler.measureFrom(start, 'test', 1e9);
	}
	const elapsed = Date.now() - startMs;
	console.log('measureFrom: %s', elapsed);
}

bare();
hrtime();
dateNow();
profiled();

