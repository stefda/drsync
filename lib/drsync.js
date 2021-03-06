const sleep = require('sleep');
const nodePath = require('path');
const Subject = require('rxjs').Subject;
const watcher = require('chokidar');
const sync = require('./sync');

function trySync(files, deleteExt, options) {
  return sync(files, true, options)
    .catch((err) => {
    console.log(err + ', retrying in 1s...');
      sleep.msleep(1000);
      return trySync(files, deleteExt, options);
    });
}

/**
 * @param options
 * @return {Observable}
 */
module.exports = function (options) {

  const observable = new Subject();

  // rsync response handlers
  const handleResponse = (response) => response.map(message => observable.next(message));
  const handleError = (err) => observable.next(err);

  // initial rsync
  // sync(options.files, true, options)
  //   .then(handleResponse)
  //   .catch(handleError);
  trySync(options.files, true, options).then(handleResponse);

  if (options.watch) {
    const ignored = /((^|[\/\\])\..)|(___$)/;
    watcher.watch(options.files, { ignoreInitial: true, ignored }).on('all', (event, file) => {
      observable.next(`info: [${event}] ${file}`);

      // todo: throttle unlinking files and dirs
      if (event === 'unlink' || event === 'unlinkDir') {
        let path = nodePath.dirname(file);
        trySync([path], true, options).then(handleResponse);
        // sync([path], true, options)
        //   .then(handleResponse)
        //   .catch(handleError);
        return;
      }

      trySync([file], false, options).then(handleResponse);
      // sync([file], false, options)
      //   .then(handleResponse)
      //   .catch(handleError);
    });
  }

  return observable;
};
