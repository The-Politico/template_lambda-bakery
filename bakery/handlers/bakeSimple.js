import { exportData, sweepTmp, renderTemplate, s3 } from 'Bakery/utils';

export const ACTION = 'bake_simple';

export default async function(payload) {
  const { data } = payload;
  await exportData(data, 'simple-page-test/data.json');
  await renderTemplate('simple', payload, 'simple-page-test');
  await s3.syncDir();
  if (!process.env.TESTING) await sweepTmp();
  return 'OK';
};
