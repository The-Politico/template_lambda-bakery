import { exportData, syncTmp, sweepTmp, renderTemplate } from 'ServerUtils';

export default async function(payload) {
  const FILE_PATH_PREFIX = '';
  await exportData(payload.data, FILE_PATH_PREFIX);
  await renderTemplate('base', payload, FILE_PATH_PREFIX);

  const INVALIDATE = false;
  const url = await syncTmp(INVALIDATE);

  await sweepTmp();

  return url;
};
