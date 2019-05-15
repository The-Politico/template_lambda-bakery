import path from 'path';
import { writeJson } from 'fs-extra';
import ensureTmp from './ensureTmp';
import { BAKERY_TMP_DIR } from 'Bakery/constants/locations';

const exportData = async function(data, filePath) {
  if (!data || !filePath) return new Error('Must send data and filePath to exportData');
  await ensureTmp(path.dirname(filePath));
  await writeJson(path.join(BAKERY_TMP_DIR, filePath), data);
};

export default exportData;
