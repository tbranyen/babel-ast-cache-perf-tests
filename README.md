```
npm install
npm t
```

```
> babel-ast-cache-perf@1.0.0 test /home/tbranyen/git/babel-ast-cache-perf
> node index.js

runtime generation x 2.46 ops/sec ±8.37% (11 runs sampled)
require() JSON file x 2.89 ops/sec ±14.67% (12 runs sampled)
readFileSync + JSON.parse x 2.79 ops/sec ±23.61% (12 runs sampled)
readFileSync + eval x 4.22 ops/sec ±24.73% (16 runs sampled)
readFileSync + Function eval x 5.49 ops/sec ±38.41% (21 runs sampled)
Fastest is readFileSync + Function eval
```
