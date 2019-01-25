const { log } = console;

// Silence Babel output.
Object.keys(console).forEach(key => console[key] = () => {});

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
  .on('cycle', ({ target }) => {
    log(String(target));
  })
  .on('complete', function() {
    log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
//*/
