import { exportData, uploadData, sweepTmp, ensureTmp } from 'ServerUtils';

export default async function(payload) {
  await ensureTmp();

  await exportData(payload.data);

  const url = await uploadData('');

  await sweepTmp();

  return url;
};
