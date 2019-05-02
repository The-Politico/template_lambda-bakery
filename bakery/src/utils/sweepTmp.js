import glob from 'glob';
import { remove } from 'fs-extra';
import { TMP } from 'ServerConstants/locations';

export default () => {
  const files = glob.sync(`${TMP}/**`).filter(f => f !== TMP);
  return Promise.all(files.map(f => {
    return remove(f);
  }));
};
