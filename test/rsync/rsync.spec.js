const sinon = require('sinon');
const mock = require('mock-require');
require('jasmine-sinon');

describe('rsync', function () {

  let mockExecute = (callback) => {
    return callback(null, 0, 'rsync');
  };

  let mockClient = {
    flags: sinon.stub().returnsThis(),
    source: sinon.stub().returnsThis(),
    destination: sinon.stub().returnsThis(),
    set: sinon.stub().returnsThis(),
    execute: mockExecute
  };

  mock('rsync', function () { return mockClient; });
  let rsync = require('../../lib/rsync').client;

  it('should not set the flags by default', () => {
    return rsync('src', 'destination').then(() => {
      expect(mockClient.flags.called).toEqual(false);
    });
  });

  it('should set the source', () => {
    return rsync('src', 'destination').then(() => {
      expect(mockClient.source).toHaveBeenCalledWith('src');
    });
  });

  it('should set the destination', () => {
    return rsync('src', 'destination').then(() => {
      expect(mockClient.destination).toHaveBeenCalledWith('destination');
    });
  });

  it('should not set the delete flag by default', () => {
    return rsync('src', 'destination').then(() => {
      expect(mockClient.set.calledWith('delete')).toEqual(false);
    });
  });

  it('should set custom flags if provided via options', () => {
    return rsync('src', 'destination', { flags: 'custom' }).then(() => {
      expect(mockClient.flags).toHaveBeenCalledWith('custom');
    });
  });

  it('should not set the delete flag if requested via options', () => {
    return rsync('src', 'destination', { delete: false }).then(() => {
      expect(mockClient.set.calledWith('delete')).toEqual(false);
    });
  });

  it('should set the delete flag if requested via options', () => {
    return rsync('src', 'destination', { delete: true }).then(() => {
      expect(mockClient.set).toHaveBeenCalledWith('delete');
    });
  });

  it('should complete with a message', () => {
    return rsync('src', 'destination').then(result => {
      expect(result).toEqual('info: rsync completed');
    });
  });

  it('should propagate errors via catch', () => {
    mockClient.execute = (callback) => {
      callback(new Error('error'), 1, 'rsync');
    };

    return rsync('src', 'destination').catch(err => {
      expect(err).toEqual('error: rsync exited with code 1');
    });
  });
});
