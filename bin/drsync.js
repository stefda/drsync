#!/usr/bin/env node
const cli = require('../lib/cli');

// define cli options
const optionList = [
  { name: 'help', type: Boolean, description: 'show this help' },
  { name: 'host', alias: 'h', type: String, description: 'host name' },
  { name: 'port', alias: 'p', type: Number, description: 'port number' },
  { name: 'watch', alias: 'w', type: Boolean, description: 'start in a watch mode' },
  { name: 'docker', alias: 'd', type: Boolean, description: 'parse docker-compose.yml for parameters' },
  { name: 'file', alias: 'f', type: String, description: 'override the default docker-compose.yml file name' },
  { name: 'service', alias: 's', type: String, description: 'service to look for when parsing docker-compose file' },
  { name: 'exclude', alias: 'e', type: String, description: 'exclude files matching pattern' },
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

const args = require('command-line-args')(optionList, {}, process.argv);

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

const rsyncUrl = require('../lib/rsync').url;
const rsync = require('../lib/rsync').client;

if (!options.watch) {
  for (const file of options.files) {
    const src = file;
    const dest = rsyncUrl(options.host, options.port, options.volume);
    rsync(src, dest, { flags: 'rtR' })
      .then(console.log)
      .catch(err => {
        console.log(err);
        process.exit(1);
      });
  }
}
//
// console.log(options);
//
// const dcp = require('../lib/dcp');
// const drsync = require('../lib/drsync');
//
// const optionList = [
//   { name: 'help', type: String },
//   { name: 'file', alias: 'f', type: String },
//   { name: 'service', alias: 's', type: String },
//   { name: 'host', alias: 'h', type: String },
//   // { name: 'ignore-initial', alias: 'i', type: Boolean },
//   { name: 'path', type: String, defaultOption: true, required: true }
// ];
//
// // todo: handle unknown options
// // todo: add version info
//
// const usageDefinition = [
//   {
//     header: 'Synopsis',
//     content: [
//       '$ drsync [[bold]{-f} [underline]{file=docker-compose.yml}] [[bold]{-s} [underline]{service=rsync}] [[bold]{-h} [underline]{host=192.168.99.100}] path',
//       '$ drsync [bold]{--help}'
//     ]
//   },
//   {
//     header: 'Options',
//     optionList
//   }
// ];
//
// let options = cli(optionList);
// if (options.help) {
//   console.log(usage(usageDefinition));
//   process.exit(0);
// }
//
// if (!options.path) {
//   console.log(usage(usageDefinition));
//   process.exit(1);
// }
//
// options.service = options.service || 'rsync';
// options.host = options.host || '192.168.99.100';
// options.file = options.file || 'docker-compose.yml';
// // options.ignoreInitial = options['ignore-initial'] === true;
// // delete options['ignore-initial'];
//
// try {
//   const settings = dcp.parse(options);
//   drsync(settings);
// } catch (err) {
//   console.log(err.message);
//   process.exit(1);
// }
