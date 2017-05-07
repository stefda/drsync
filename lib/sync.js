const Promise = require('bluebird');
const rsync = require('./rsync').client;
const rsyncUrl = require('./rsync').url;

/**
 * @param {string[]} files
 * @param {boolean} deleteExt
 * @param {object} options
 * @returns {Promise.<string[]>}
 */
function sync(files, deleteExt, options) {
  const dest = rsyncUrl(options.host, options.port, options.volume);
  const promises = [];

  for (const file of files) {
    const promise = rsync(file, dest, deleteExt, options.flags);
    promises.push(promise);
  }

  return Promise.all(promises);
}

module.exports = sync;
