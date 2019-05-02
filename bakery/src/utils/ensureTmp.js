import path from 'path';
import { TMP, S3_PATH_PREFIX } from 'ServerConstants/locations';
import { ASSET as ASSET_S3_PARAMS } from 'ServerConstants/s3params';
import { sync } from './s3';

const uploadTmp = async function(invalidate = false, fp = '') {
  const key = path.join(S3_PATH_PREFIX, fp);
  await sync({
    directory: TMP,
    path: key,
    bucket: process.env.AWS_BUCKET_NAME,
    invalidate: invalidate,
  }, ASSET_S3_PARAMS);

  return path.join(process.env.AWS_BUCKET_URL, key);
};

export default uploadTmp;
