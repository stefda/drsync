function split(path) {
  // guess path separator
  const sep = path.indexOf('\\') === -1 ? '/' : '\\';

  // remove trailing slash if present
  if (path.slice(-1) === sep) {
    path = path.substring(0, path.length - 1);
  }

  return path.split(sep);
}

/**
 * Joins all given path segments together using the given separator as a delimiter.
 *
 * @param {string[]} paths
 * @param {string} sep
 * @return {string}
 */
function join(paths, sep = '/') {
  return paths.join(sep) + sep;
}

/**
 * Finds a sequence of path segments that are common to all given paths.
 *
 * @param {string[]} paths
 * @return {string[]}
 */
function common(...paths) {
  if (paths.length === 0) {
    return;
  }

  splitPaths = paths.map(path => split(path));
  let commonPath = splitPaths[0];

  for (let i = 1; i < splitPaths.length; i++) {
    const splitPath = splitPaths[i];
    const tempPath = [];
    if (splitPath[0] !== commonPath[0]) {
      return [];
    }
    for (let j = 0; j < Math.min(splitPath.length, commonPath.length); j++) {
      if (splitPath[j] === commonPath[j]) {
        tempPath.push(splitPath[j]);
      }
    }
    commonPath = tempPath;
  }

  return commonPath;
}

module.exports = {
  split,
  join,
  common
};
