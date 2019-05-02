import path from 'path';
import { ensureDir } from 'fs-extra';
import { TMP } from 'ServerConstants/locations';

export default (fp = '') => ensureDir(path.join(TMP, fp));
