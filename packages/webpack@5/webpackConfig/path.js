const path = require('path');

const rootDir = process.cwd();

console.log(rootDir);

const resolveApp = (resolvePath) => {
  return path.resolve(rootDir, resolvePath);
};

module.exports = resolveApp;
