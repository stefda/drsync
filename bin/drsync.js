#!/usr/bin/env node
const fs = require('fs');
const yaml = require('js-yaml');
const cli = require('../lib/cli');

// define cli options
const optionList = [
  { name: 'help', type: Boolean, description: 'show this help' },
  { name: 'host', alias: 'h', type: String, description: 'host name' },
  { name: 'port', alias: 'p', type: Number, description: 'port number' },
  { name: 'watch', alias: 'w', type: Boolean, description: 'start in a watch mode' },
  { name: 'docker', alias: 'd', type: Boolean, description: 'parse docker-compose.yml for parameters' },
  // { name: 'file', alias: 'f', type: String, description: 'override the default docker-compose.yml file name' },
  { name: 'service', alias: 's', type: String, description: 'service to look for when parsing docker-compose file' },
  { name: 'flags', alias: 'l', type: String, description: 'custom flags to pass to rsync (default -rtR)' },
  { name: 'volume', alias: 'v', type: String, description: 'override the default volume name' },
  { name: 'version', type: Boolean, description: 'print version number' },
  { name: 'files', type: String, defaultOption: true, multiple: true }
];

// define cli usage
const usage = function (options) {
  return require('command-line-usage')([
    {
      header: 'Synopsis',
      content: [
        '$ drsync [bold]{--help}',
      ]
    },
    {
      header: 'Options',
      optionList
    }
  ])
};

let args = require('command-line-args')(optionList, {}, process.argv);

// override args with options from drsync.yml
if (fs.existsSync('./drsync.yml')) {
  const overrides = yaml.safeLoad(fs.readFileSync('./drsync.yml', 'utf8'));
  if (overrides) {
    args = Object.assign({}, args, overrides.options);
  }
}

let options = {};
try {
  options = cli(args);
} catch (err) {
  console.log(err.message);
  process.exit();
}

// show help if requested
if (options.help) {
  console.log(usage(options));
  process.exit();
}

// show version and exit
if (options.version) {
  console.log(require('../package.json').version);
  process.exit();
}

require('../lib/drsync')(options).subscribe(console.log);
