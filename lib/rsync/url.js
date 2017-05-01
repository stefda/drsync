/**
 * Converts the given host, port and path into a url compliant with the native rsync protocol.
 *
 * @param {string} host
 * @param {number} port
 * @param {string} path
 * @returns {string}
 */
module.exports = function (host, port, path) {
  return `rsync://${host}:${port}/${path}`;
};
