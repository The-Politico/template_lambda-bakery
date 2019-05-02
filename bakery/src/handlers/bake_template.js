import { exportData, syncTmp, sweepTmp, renderTemplate } from 'ServerUtils';

export default async function(payload) {
  await exportData(payload.data);

  await renderTemplate('index', payload);

  const FILE_PATH_PREFIX = '';
  const INVALIDATE = false;
  const url = await syncTmp(FILE_PATH_PREFIX, INVALIDATE);

  await sweepTmp();

  return url;
};
