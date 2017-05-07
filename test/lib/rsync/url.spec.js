const rsyncUrl = require('../../../lib/rsync').url;

describe('rsync url()', () => {

  it('should convert parameters into rsync protocol-compliant url', () => {
    const url = rsyncUrl('localhost', 873, 'volume');
    expect(url).toEqual('rsync://localhost:873/volume');
  });
});
