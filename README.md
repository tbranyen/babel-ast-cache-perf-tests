```
npm install
npm t
```

```
 9.2M fixture.bin
 1.3M fixture.bin.gz
  12M fixture.json
 1.3M fixture-compressed.json.gz
```

```
- Runtime generation using source string and Babel transform
- Using the Node `require()` function to read and parse fixture JSON
- Read in the fixture using Node's `fs` module and parse to object using `JSON.parse`
- Read and parse using `eval` 
- Read and parse using the `Function` constructor and invoking to parse
- Read compressed JSON, decompress using `zlib`, and use `Function` to parse
- Read binary file produced with `v8.serialize` and deserialize with `v8.deserialize`
- Read compressed binary file produced with `v8.serialize`, decompress using `zlib`, and deserialize with `v8.deserialize`
```

```
> babel-ast-cache-perf@1.0.0 test /home/tbranyen/git/babel-ast-cache-perf-tests
> node index.js

runtime generation x 2.11 ops/sec ±9.98% (10 runs sampled)
require() JSON file x 3.22 ops/sec ±10.32% (12 runs sampled)
readFileSync + JSON.parse x 2.53 ops/sec ±28.58% (11 runs sampled)
readFileSync + eval x 1.46 ops/sec ±19.23% (8 runs sampled)
readFileSync + Function eval x 1.18 ops/sec ±19.31% (8 runs sampled)
readFileSync + gunzipSync + Function eval x 1.36 ops/sec ±18.19% (8 runs sampled)
readFileSync binary file + v8 deserialize x 5.13 ops/sec ±27.63% (16 runs sampled)
readFileSync binary file + gunzipSync + v8 deserialize x 5.26 ops/sec ±14.54% (15 runs sampled)
Fastest is readFileSync binary file + gunzipSync + v8 deserialize
```
