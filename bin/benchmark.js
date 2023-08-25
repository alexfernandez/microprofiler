import microprofiler from '../index.js'

const iterations = 1e7


function bare() {
	const start = Date.now();
	for (let i = 0; i < iterations; i++) {
		// do nothing
	}
	const elapsed = Date.now() - start;
	console.log(`Bare loop: ${elapsed} ms`);
}

function hrtime() {
	const start = Date.now();
	for (let i = 0; i < iterations; i++) {
		process.hrtime();
	}
	const elapsed = Date.now() - start;
	console.log(`process.hrtime(): ${elapsed} ms`);
}

function bigint() {
	const start = Date.now();
	for (let i = 0; i < iterations; i++) {
		process.hrtime.bigint();
	}
	const elapsed = Date.now() - start;
	console.log(`process.hrtime.bigint(): ${elapsed} ms`);
}

function dateNow() {
	const start = Date.now();
	for (let i = 0; i < iterations; i++) {
		Date.now();
	}
	const elapsed = Date.now() - start;
	console.log(`Date.now(): ${elapsed} ms`);
}

function profileStart() {
	const startMs = Date.now();
	for (let i = 0; i < iterations; i++) {
		microprofiler.start();
	}
	const elapsed = Date.now() - startMs;
	console.log(`start(): ${elapsed} ms`);
}

function profileMeasureFrom() {
	const startMs = Date.now();
	const start = microprofiler.start();
	for (let i = 0; i < iterations; i++) {
		microprofiler.measureFrom(start, 'test', 1e9);
	}
	const elapsed = Date.now() - startMs;
	console.log(`measureFrom(): ${elapsed} ms`);
}

console.log(`Milliseconds for ${iterations} iterations:`)
bare();
hrtime();
bigint()
dateNow();
profileStart();
profileMeasureFrom()

