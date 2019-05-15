import glob from 'glob';
import { remove } from 'fs-extra';
import { BAKERY_TMP_DIR } from 'Bakery/constants/locations';

export default () => {
  const files = glob.sync(`${BAKERY_TMP_DIR}/**`);
  return Promise.all(files.map(f => remove(f)));
};
