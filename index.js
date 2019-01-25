const { log } = console;

// Silence Babel output.
Object.keys(console).forEach(key => console[key] = () => {});

const { gunzipSync } = require('zlib');
const { serialize, deserialize } = require('v8');
const { join } = require('path');
const { equal } = require('assert');
const { readFile, readFileSync } = require('fs');
const { Suite } = require('benchmark');
const { transformSync } = require('@babel/core');

// In all solutions the source must be loaded in order for source maps to be
// produced, so we can preload this before running any benchmark.
const testModule = 'react-dom/cjs/react-dom.development'
const encoding = 'utf8';
const sourceCode = readFileSync(require.resolve(testModule), { encoding });
const path = join(__dirname, 'fixture.json');
const bin = join(__dirname, 'fixture.bin');
const zip = join(__dirname, 'fixture-compressed.json.gz');

// I didn't notice a significant difference between sync and async methods, so
// while real-world usage will be async `readFile`, the tests will use
// `readFileSync` instead.

//*
new Suite()
  .add('runtime generation', () => {
    const { ast } = transformSync(sourceCode, {
      sourceType: 'script',
      babelrc: false,
      ast: true,
    });

    equal(ast.type, 'File');
  })
  .add('require() JSON file', () => {
    const ast = require(path);

    equal(ast.type, 'File');
    delete require.cache[path];
  })
  .add('readFileSync + JSON.parse', () => {
    const contents = readFileSync(path);
    const ast = JSON.parse(contents);

    equal(ast.type, 'File');
  })
  .add('readFileSync + eval', () => {
    const contents = readFileSync(path);
    const ast = eval(`(${contents})`);

    equal(ast.type, 'File');
  })
  .add('readFileSync + Function eval', () => {
    const contents = readFileSync(path);
    const ast = Function(`return ${contents}`)();

    equal(ast.type, 'File');
  })
  .add('readFileSync + gunzipSync + Function eval', () => {
    const contents = gunzipSync(readFileSync(zip));
    const ast = Function(`return ${contents}`)();

    equal(ast.type, 'File');
  })
  .add('readFileSync binary file + v8 deserialize', () => {
    const contents = readFileSync(bin);
    const ast = deserialize(contents);

    equal(ast.type, 'File');
  })
  .on('cycle', ({ target }) => {
    log(String(target));
  })
  .on('complete', function() {
    log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
//*/
