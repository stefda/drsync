const path = require('../../../lib/unlinker').path;
const sinon = require('sinon');
require('jasmine-sinon');

describe('path', () => {

  describe('#split', () => {
    it(' should split root path', () => {
      const pathArray = path.split('/');
      expect(pathArray).toEqual(['']);
    });

    it(' should split absolute path with multiple directories', () => {
      const pathArray = path.split('/dir1/dir2');
      expect(pathArray).toEqual(['', 'dir1', 'dir2']);
    });

    it(' should split relative path with multiple directories', () => {
      const pathArray = path.split('dir1/dir2');
      expect(pathArray).toEqual(['dir1', 'dir2']);
    });

    it(' should ignore trailing slash', () => {
      const pathArray = path.split('/dir/');
      expect(pathArray).toEqual(['', 'dir']);
    });

    it(' should handle backslash', () => {
      const pathArray = path.split('dir1\\dir2\\');
      expect(pathArray).toEqual(['dir1', 'dir2']);
    });
  });

  describe('#join', () => {
    it('should join root path', () => {
      const joined = path.join(['']);
      expect(joined).toEqual('/');
    });

    it('should join absolute path with multiple directories', () => {
      const joined = path.join(['', 'dir1', 'dir2']);
      expect(joined).toEqual('/dir1/dir2/');
    });

    it('should use custom separator when given', () => {
      const joined = path.join(['C:', 'dir1', 'dir2'], '\\');
      expect(joined).toEqual('C:\\dir1\\dir2\\');
    });
  });

  describe('#common', () => {
    it('should find common path segments', () => {
      const common = path.common('/dir1/dir2', '/dir1/dir3');
      expect(common).toEqual(['', 'dir1']);
    });

    it('should return an empty array if paths have no sequence of segments in common', () => {
      const common = path.common('/dir1/dir2', 'dir1/dir3');
      expect(common).toEqual([]);
    });
  });
});
