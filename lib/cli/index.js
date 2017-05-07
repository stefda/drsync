const volume = (volume) => volume || 'volume';
const port = (port) => port || 873;
const flags = (flags) => flags || 'rtR';

function manual(args) {
  if (!args.host || !args.files || args.files.length === 0) {
    throw new Error('The specified options are invalid, see drsync --help for usage details.');
  }

  args.port = port(args.port);
  args.volume = volume(args.volume);
  args.flags = flags(args.flags);

  return args;
}

function automatic(args) {
  throw new Error('feature not yet implemented');
}

function cli(args) {
  // show help if no options were provided
  if (Object.keys(args).length === 0) {
    args.help = true;
  }

  if (args.help || args.version) {
    return args;
  }

  if (!args.docker) {
    return manual(args);
  } else {
    return automatic(args);
  }
}

module.exports = cli;
