import { exportData, uploadData, sweepTmp } from 'ServerUtils';

export default async function(payload) {
  await exportData(payload.data);

  const FILE_PATH_PREFIX = '';
  const INVALIDATE = false;
  const url = await uploadData(FILE_PATH_PREFIX, INVALIDATE);

  await sweepTmp();

  return url;
};
