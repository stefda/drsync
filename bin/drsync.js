#!/usr/bin/env node
const cli = require('command-line-args');
const usage = require('command-line-usage');
const dcp = require('../lib/dcp');
const drsync = require('../lib/drsync');

const optionList = [
  { name: 'help', type: String },
  { name: 'file', alias: 'f', type: String },
  { name: 'service', alias: 's', type: String },
  { name: 'host', alias: 'h', type: String },
  // { name: 'ignore-initial', alias: 'i', type: Boolean },
  { name: 'path', type: String, defaultOption: true, required: true }
];

// todo: handle unknown options
// todo: add version info

const usageDefinition = [
  {
    header: 'Synopsis',
    content: [
      '$ drsync [[bold]{-f} [underline]{file=docker-compose.yml}] [bold]{-h} [underline]{host=192.168.99.100} path',
      '$ drsync [bold]{--help}'
    ]
  },
  {
    header: 'Options',
    optionList
  }
];

let options = cli(optionList);
if (options.help) {
  console.log(usage(usageDefinition));
  process.exit(0);
}

if (!options.path) {
  console.log(usage(usageDefinition));
  process.exit(1);
}

options.service = options.service || 'rsync';
options.host = options.host || '192.168.99.100';
options.file = options.file || 'docker-compose.yml';
// options.ignoreInitial = options['ignore-initial'] === true;
// delete options['ignore-initial'];

try {
  const settings = dcp.parse(options);
  drsync(settings);
} catch (err) {
  console.log(err.message);
  process.exit(1);
}
