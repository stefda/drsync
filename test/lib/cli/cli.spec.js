const cli = require('../../../lib/cli');
const sinon = require('sinon');
require('jasmine-sinon');

describe('cli', () => {

  it('should forward the .help flag', () => {
    let options = cli({ help: true });
    expect(options.help).toEqual(true);
  });

  it('should forward the .version flag', () => {
    let options = cli({ version: true });
    expect(options.version).toEqual(true);
  });

  it('should throw in manual mode without .host', () => {
    expect(() => cli({ files: ['file'] })).toThrow(
      new Error('The specified options are invalid, see drsync --help for usage details.'));
  });

  it('should throw in manual mode without .files', () => {
    expect(() => cli({ host: 'localhost' })).toThrow(
      new Error('The specified options are invalid, see drsync --help for usage details.'));
  });

  it('should complete .port if it was not provided', () => {
    const options = cli({ host: 'localhost', files: ['file'] });
    expect(options.port).toEqual(873);
  });

  it('should forward .port if it was provided', () => {
    const options = cli({ host: 'localhost', files: ['file'], port: 10873 });
    expect(options.port).toEqual(10873);
  });

  it('should complete .volume if it was not provided', () => {
    const options = cli({ host: 'localhost', files: ['file'] });
    expect(options.volume).toEqual('volume');
  });

  it('should forward .volume if it was provided', () => {
    const options = cli({ host: 'localhost', files: ['file'], volume: 'custom-volume' });
    expect(options.volume).toEqual('custom-volume');
  });

  it('should complete .flags if they were not provided', () => {
    const options = cli({ host: 'localhost', files: ['file'] });
    expect(options.flags).toEqual('rtR');
  });

  it('should forward .flags if they were provided', () => {
    const options = cli({ host: 'localhost', files: ['file'], flags: 'customFlags' });
    expect(options.flags).toEqual('customFlags');
  });
});
