import path from 'path';
import { ensureDir } from 'fs-extra';
import { BAKERY_TMP_DIR } from 'Bakery/constants/locations';

export default (filePath = '') => ensureDir(path.join(BAKERY_TMP_DIR, filePath));
