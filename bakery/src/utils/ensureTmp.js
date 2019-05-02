import { ensureDir } from 'fs-extra';
import { TMP } from 'ServerConstants/locations';

export default () => ensureDir(TMP);
