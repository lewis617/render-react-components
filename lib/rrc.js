const chalk = require('chalk');
const { fork } = require('child_process');
const yargs = require('yargs');
const rimraf = require('rimraf');
const updater = require('update-notifier');
const renderReact = require('./renderReact');
const init = require('./init');
const pkg = require('../package.json');

const { argv } = yargs
  .alias('f', 'filter')
  .alias('v', 'version');

const nodeVersion = process.versions.node;
const versions = nodeVersion.split('.');
const major = versions[0];
const minor = versions[1];

if ((major * 10) + (minor * 1) < 65) {
  console.log(`Node version must >= 6.5, but got ${major}.${minor}`);
  process.exit(1);
}

// Notify update
updater({ pkg }).notify();

// print version
if (argv.version) {
  console.log(pkg.version);
  if (!(pkg._from && pkg._resolved)) {
    console.log(chalk.cyan('@local'));
  }
  return;
}

switch (argv._[0]) {
  case 'init': {
    const { filter } = argv;
    init(filter);
    break;
  }
  case 'dev': {
    renderReact();
    break;
  }
  case 'clean': {
    rimraf.sync('rrc');
    rimraf.sync('.rrc.js');
    break;
  }
  default:
    console.log(`Unknown script ${chalk.cyan(argv._[0])}.`);
    break;
}
