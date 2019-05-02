import cp from 'cp';
import path from 'path';
import { writeFile } from 'fs-extra';
import find from 'lodash/find';
import glob from 'glob';
import { templates } from 'Config/constants';
import { INVALID_CHAT_TYPE } from 'ServerConstants/errors';
import { TMP } from 'ServerConstants/locations';
import ensureTmp from 'ServerUtils/ensureTmp';

const getTemplate = templateName => {
  const type = find(templates, { name: templateName }, null);
  if (type === null || type === undefined) {
    throw new Error(INVALID_CHAT_TYPE(templateName));
  }
  return type;
};

export default async function(templateName, payload) {
  let { staticPath, renderer } = getTemplate(templateName);

  await ensureTmp();

  const html = await renderer(payload.data);
  await writeFile(path.join(TMP, 'index.html'), html);

  if (staticPath) {
    glob.sync(`${staticPath}/**`).filter(fp => {
      const filename = fp.split('/')[fp.split('/').length - 1];
      return (
        (filename.startsWith('client') && filename.endsWith('.js')) ||
        (filename.startsWith('styles') && filename.endsWith('.css'))
      );
    }).forEach(fp => {
      const filename = fp.split('/')[fp.split('/').length - 1];
      cp.sync(fp, path.join(TMP, filename));
    });
  }
};
