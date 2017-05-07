function split(path) {
  // guess path separator
  const sep = path.indexOf('\\') === -1 ? '/' : '\\';

  // remove trailing slash if present
  if (path.slice(-1) === sep) {
    path = path.substring(0, path.length - 1);
  }

  return path.split(sep);
}

function join(pathArray, sep = '/') {
  return pathArray.join(sep) + sep;
}

module.exports = {
  split,
  join
};
