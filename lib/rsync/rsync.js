const Rsync = require('rsync');
const Promise = require('bluebird');

/**
 * @param {string} source
 * @param {string} url
 * @param {object} options
 */
function rsync(source, url, options = {}) {
  const flags = options.flags || 'rtR';
  const deleteExtraneous = options.delete || false;

  const client = new Rsync();
  client
    .flags(flags)
    .source(source)
    .destination(url);


  if (deleteExtraneous) {
    client.set('delete');
  }

  return new Promise((resolve, reject) => {
    client.execute((err, code, cmd) => {
      if (err) {
        let message = err.message;
        return reject(message);
      }

      let message = `${cmd} finished with code ${code}`;
      return resolve(message);
    });
  });
}

module.exports = rsync;
