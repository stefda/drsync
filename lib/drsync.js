const nodePath = require('path');
const watcher = require('chokidar');
const Rsync = require('rsync');

module.exports = function (settings) {

  let getRsync = (source, del = false) => {
    let rsync = new Rsync()
      .flags('rtR')
      .source(source)
      .destination(`rsync://${settings.host}:${settings.port}/volume`);

    if (del) {
      rsync.delete();
    }

    return rsync;
  };

  let resultHandler = (err, code, cmd) => {
    if (err) {
      console.log(err);
      console.log(code);
      console.log(cmd);
    } else {
      console.log(cmd, 'synced');
    }
  };

  // initial rsync
  getRsync(settings.path, true).execute(resultHandler);

  watcher.watch(settings.path, { ignoreInitial: true, ignored: /((^|[\/\\])\..)|(___jb_tmp___$)/ }).on('all', (event, file) => {
    console.log(event, file);
    if (event === 'unlink') {
      let path = nodePath.dirname(file);
      getRsync(path, true).execute(resultHandler);
    } else {
      getRsync(file).execute(resultHandler);
    }
  });
};
