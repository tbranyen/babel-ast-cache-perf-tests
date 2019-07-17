```
npm install
npm t
```

```
 9.2M fixture.bin
  12M fixture.json
 1.3M fixture-compressed.json.gz
```

```
- Runtime generation using source string and Babel transform
- Using the Node `require()` function to read and parse fixture JSON
- Read in the fixture using Node's `fs` module and parse to object using `JSON.parse`
- Read and parse using `eval` 
- Read and parse using the `Function` constructor and invoking to parse
- Read compressed JSON, and decompress using `zlib`, and use `Function` to parse
- Read binary file produced with `v8.serialize` and deserialize with `v8.deserialize`
```

```
> babel-ast-cache-perf@1.0.0 test /home/tbranyen/git/babel-ast-cache-perf
> node index.js

runtime generation x 2.12 ops/sec ±10.30% (10 runs sampled)
require() JSON file x 3.32 ops/sec ±9.63% (12 runs sampled)
readFileSync + JSON.parse x 2.75 ops/sec ±29.12% (11 runs sampled)
readFileSync + eval x 1.31 ops/sec ±21.94% (8 runs sampled)
readFileSync + Function eval x 1.42 ops/sec ±14.20% (8 runs sampled)
readFileSync + gunzipSync + Function eval x 1.17 ops/sec ±20.30% (7 runs sampled)
readFileSync binary file + v8 deserialize x 5.54 ops/sec ±31.44% (17 runs sampled)
Fastest is readFileSync binary file + v8 deserialize
```
