const expect = require('chai').expect;
const rsyncUrl = require('../../lib/rsync').url;

describe('rsync url()', () => {

  it('should convert parameters into rsync protocol-compliant url', () => {
    const url = rsyncUrl('localhost', 873, 'volume');
    expect(url).to.equal('rsync://localhost:873/volume');
  });
});
