const Rsync = require('rsync');
const Promise = require('bluebird');

/**
 * @param {string} source
 * @param {string} url
 * @param {object} options
 */
function rsync(source, url, options = {}) {
  const client = new Rsync();
  client
    .source(source)
    .destination(url);

  if (options.flags) {
    client.flags(options.flags);
  }

  if (options.delete) {
    client.set('delete');
  }

  return new Promise((resolve, reject) => {
    client.execute((err, code, cmd) => {
      if (err) {
        return reject(`error: ${cmd} exited with code ${code}`);
      }

      return resolve(`info: ${cmd} completed`);
    });
  });
}

module.exports = rsync;
