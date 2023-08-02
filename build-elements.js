const fs = require('fs-extra');
const concat = require('concat');
const pkg = require('./package.json');

const target = process.argv.slice(2) || 'es2015';

(async function build() {

  console.info(`Building widget elements for ${target}...`);
  // list files to concant
  const files = [
    `./dist/widget/polyfills.js`,
    `./dist/widget/main.js`
  ];
  // ensure the directory is created
  await fs.ensureDir(`./docs/js`);
  await concat(files, './docs/js/botscript-widget-latest.js');
  await concat(files, `./docs/js/botscript-widget-v${pkg.version}.js`);
  // await fs.copy('./src/index.html', './docs/index.html');
  console.info('Elements created successfully!');
})()
