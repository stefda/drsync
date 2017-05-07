const nodePath = require('path');
const Subject = require('rxjs').Subject;
const watcher = require('chokidar');
const sync = require('./sync');

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
  sync(options.files, true, options)
    .then(handleResponse)
    .catch(handleError);

  if (options.watch) {
    const ignored = /((^|[\/\\])\..)|(___$)/;
    watcher.watch(options.files, { ignoreInitial: true, ignored }).on('all', (event, file) => {
      observable.next(`info: [${event}] ${file}`);

      // todo: throttle unlinking files and dirs
      if (event === 'unlink' || event === 'unlinkDir') {
        let path = nodePath.dirname(file);
        sync([path], true, options)
          .then(handleResponse)
          .catch(handleError);
        return;
      }

      sync([file], false, options)
        .then(handleResponse)
        .catch(handleError);
    });
  }

  return observable;
};
