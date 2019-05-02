import path from 'path';
import { writeJson } from 'fs-extra';
import ensureTmp from './ensureTmp';
import { TMP } from 'ServerConstants/locations';

const exportData = async function(data, filepath = '') {
  await ensureTmp();
  await writeJson(path.join(TMP, filepath, 'data.json'), data);
};

export default exportData;
