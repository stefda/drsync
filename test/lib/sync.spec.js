const sinon = require('sinon');
const mock = require('mock-require');
require('jasmine-sinon');

describe('sync', () => {

  const mockPromise = {
    all: sinon.stub()
  };
  const mockRsync = {
    client: sinon.stub(),
    url: sinon.stub()
  };

  mock('bluebird', mockPromise);
  mock('../../lib/rsync', mockRsync);
  let sync = require('../../lib/sync');

  it('should use the host, port and volume from options to create rsync url', () => {
    const options = { host: 'localhost', port: 873, volume: 'volume' };
    sync(['file'], false, options);
    expect(mockRsync.url).toHaveBeenCalledWith('localhost', 873, 'volume');
  });

  it('should pass the deleteExt [false] parameter to rsync', () => {
    mockRsync.url.returns('dest');
    sync(['file'], false, {});
    expect(mockRsync.client).toHaveBeenCalledWith('file', 'dest', false, undefined);
  });

  it('should pass the deleteExt [true] parameter to rsync', () => {
    mockRsync.url.returns('dest');
    sync(['file'], true, {});
    expect(mockRsync.client).toHaveBeenCalledWith('file', 'dest', true);
  });

  it('should sync a single file', () => {
    mockRsync.url.returns('dest');
    mockRsync.client.returns('promise');
    sync(['file'], false, {});
    expect(mockRsync.client).toHaveBeenCalledWith('file', 'dest');
    expect(mockPromise.all).toHaveBeenCalledWith(['promise']);
  });

  it('should sync multiple files', () => {
    mockRsync.url.returns('dest');
    mockRsync.client.withArgs('file1', 'dest', false, undefined).returns('promise1');
    mockRsync.client.withArgs('file2', 'dest', false, undefined).returns('promise2');
    sync(['file1', 'file2'], false, {});

    expect(mockRsync.url).toHaveBeenCalled();
    expect(mockRsync.client).toHaveBeenCalledWith('file1', 'dest', false, undefined);
    expect(mockRsync.client).toHaveBeenCalledWith('file2', 'dest', false, undefined);
    expect(mockPromise.all).toHaveBeenCalledWith(['promise1', 'promise2']);
  });
});
