import { exportData, sweepTmp, renderTemplate, s3 } from 'Bakery/utils';

export const ACTION = 'bake_home';

export default async function(payload) {
  const { data } = payload;
  await exportData(data, 'data.json');
  await renderTemplate('home', payload);
  if (!process.env.TESTING) {
    await s3.syncDir();
    await sweepTmp();
  }
  return 'OK';
};
