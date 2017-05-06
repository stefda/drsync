const Rsync = require('rsync');
const Promise = require('bluebird');


/**
 * @param {string} source
 * @param {string} url
 * @param {boolean} deleteExt deletes extraneous files if true
 * @param {string} flags
 */
function rsync(source, url, deleteExt = false, flags = '') {
  const client = new Rsync();
  client
    .source(source)
    .destination(url);

  if (flags) {
    client.flags(flags);
  }

  if (deleteExt) {
    client.set('delete');
  }

  return new Promise((resolve, reject) => {
    client.execute((err, code, cmd) => {
      if (err) {
        return reject(`error: [${code}] ${cmd}`);
      }

      return resolve(`info: [sync] ${cmd}`);
    });
  });
}

module.exports = rsync;
