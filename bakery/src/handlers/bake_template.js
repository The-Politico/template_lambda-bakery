import { exportData, ensureTmp, uploadTmp, sweepTmp, renderTemplate } from 'ServerUtils';

export default async function(payload) {
  await ensureTmp();

  await renderTemplate('index', payload);
  await exportData(payload.data);

  const url = await uploadTmp('');

  await sweepTmp();

  return url;
};
