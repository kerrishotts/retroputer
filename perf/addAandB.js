import Benchmark from "benchmark";
import nativeAdd from "./addAandB/nativeAdd.js";
import byteAdder from "./addAandB/byteAdder.js";

var suite = new Benchmark.Suite;

const test = (a, b, r) => {
    if (r !== (a + b)) {
        throw new Error(`Invalid result. Got ${r}; expected ${a + b}`);
    }
}

const harness = (fn, ...args) => {
    let z;
    for (let a = -1000; a < 1000; a++) {
        for (let b = -4000; b < 4000; b += 4) {
            z = fn(a, b, ...args);
            test(a, b, z);
        }
    }
    return z;
}


// add tests
suite.add('Native Add', () => harness(nativeAdd))
.add('Byte Adder', () => harness(byteAdder, 2))
// add listeners
.on("error", err => console.log(err.target.error))
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
