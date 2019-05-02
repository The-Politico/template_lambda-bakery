import { exportData, uploadData, sweepTmp } from 'ServerUtils';

export default async function(payload) {
  const FILE_PATH_PREFIX = '';
  await exportData(payload.data, FILE_PATH_PREFIX);

  const INVALIDATE = false;
  const url = await uploadData(INVALIDATE);

  await sweepTmp();

  return url;
};
