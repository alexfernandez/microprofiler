import testing from 'testing'
import {test as testProfiler} from './profiler.js'


function test() {
	testing.run([testProfiler], 10000)
}

test()

