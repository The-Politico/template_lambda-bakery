import path from 'path';
import { TMP, S3_PATH_PREFIX } from 'ServerConstants/locations';
import { DATA as DATA_S3_PARAMS } from 'ServerConstants/s3params';
import { upload } from './s3';

console.log(process.env.AWS_BUCKET_NAME);

const uploadData = async function(fp = '', invalidate = false) {
  const key = path.join(S3_PATH_PREFIX, fp);
  await upload({
    file: path.join(TMP, 'data.json'),
    path: key,
    bucket: process.env.AWS_BUCKET_NAME,
    invalidate: invalidate,
  }, DATA_S3_PARAMS);

  return path.join(process.env.AWS_BUCKET_URL, key, 'data.json');
};

export default uploadData;
