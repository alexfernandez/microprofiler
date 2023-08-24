import testing from 'testing'
import {test as testProfiler} from './lib/profiler.js'


function test() {
	testing.run([testProfiler], 10000)
}

test()

