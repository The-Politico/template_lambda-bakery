import path from 'path';
import { writeJson } from 'fs-extra';
import { TMP } from 'ServerConstants/locations';

const exportData = async function(data) {
  await writeJson(path.join(TMP, 'data.json'), data);
};

export default exportData;
