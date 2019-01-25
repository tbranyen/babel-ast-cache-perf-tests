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

runtime generation x 2.46 ops/sec ±8.53% (11 runs sampled)
require() JSON file x 3.18 ops/sec ±11.26% (12 runs sampled)
readFileSync + JSON.parse x 2.60 ops/sec ±25.62% (12 runs sampled)
readFileSync + eval x 3.95 ops/sec ±25.98% (17 runs sampled)
readFileSync + Function eval x 5.59 ops/sec ±45.63% (20 runs sampled)
readFileSync + gunzipSync + Function eval x 5.43 ops/sec ±41.08% (16 runs sampled)
readFileSync binary file + v8 deserialize x 4.75 ops/sec ±28.81% (17 runs sampled)
Fastest is readFileSync + gunzipSync + Function eval,readFileSync + Function eval
```
