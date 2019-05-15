import { exportData, sweepTmp, renderTemplate, s3 } from 'Bakery/utils';

export const ACTION = 'bake_home';

export default async function(payload) {
  const { data } = payload;
  await exportData(data, 'data.json');
  await renderTemplate('home', payload);
  await s3.syncDir();
  if (!process.env.TESTING) await sweepTmp();
  return 'OK';
};
