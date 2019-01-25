```
npm install
npm t
```

```
> babel-ast-cache-perf@1.0.0 test /home/tbranyen/git/babel-ast-cache-perf
> node index.js

runtime generation x 2.21 ops/sec ±7.30% (11 runs sampled)
require() JSON file x 3.22 ops/sec ±11.39% (12 runs sampled)
readFileSync + JSON.parse x 2.65 ops/sec ±27.70% (11 runs sampled)
readFileSync + eval x 3.50 ops/sec ±38.71% (15 runs sampled)
readFileSync + Function eval x 6.46 ops/sec ±38.19% (20 runs sampled)
readFileSync binary file + v8 deserialize x 4.26 ops/sec ±29.04% (16 runs sampled)
Fastest is readFileSync + Function eval
```
