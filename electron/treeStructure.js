const path = require('path');
const fsPromises = require('fs').promises;
const { workerData, parentPort } = require('worker_threads');

const normalizePath = (filePath) => filePath.replace(/\\/g, '/');

const readDirAsync = async (file) => {
  let dirData = [];
  try {
    dirData = await fsPromises.readdir(file);
  } catch (ex) {
    if (ex.code === 'EACCES' || ex.code === 'EPERM') {
      return null;
    }
    else {
      throw ex;
    }
  }
  return dirData;
};

let currentId = 0;

const treeStructure = async (filename, isNormalize = true) => {
  const name = path.basename(filename);
  const normalizeP = isNormalize ? normalizePath(filename) : filename;
  const elem = { path: normalizeP, text: name, value: null, children: [], collapsed: true, checked: false };
  let stats;
  try {
    stats = await fsPromises.stat(filename);
  }
  catch (e) {
    return null;
  }
  if (stats.isFile()) {
    elem.value = { id: ++currentId, size: stats.size };
  } else if (stats.isDirectory()) {
    const dir = await readDirAsync(filename);
    if (dir === null) { return null; }
    elem.children = await Promise.all(dir
      .map(child => treeStructure(path.join(filename, child), false))
      .filter(el => !!el));
    elem.value = { id: ++currentId, size: elem.children.reduce((prev, current) => prev + (current ? current.value.size : 0), 0) };
  } else {
    return null;
  }
  return elem;
};

(async () => {
  currentId = 0;
  const result = await treeStructure(workerData.paths)
  parentPort.postMessage(result);
})()

