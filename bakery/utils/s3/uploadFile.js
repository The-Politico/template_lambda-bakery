import s3 from 's3';
import path from 'path';
import merge from 'lodash/merge';
import { s3 as s3Creds, locations } from 'Bakery/constants';
import cloudfrontInvalidate from './invalidate';

export default (
  { tmpFile, bucketPath = null },
  customParams = {}
) => {
  const clientOptions = {
    s3Options: {
      accessKeyId: s3Creds.accessKeyId,
      secretAccessKey: s3Creds.secretAccessKey,
    },
  };
  const client = s3.createClient(clientOptions);

  const tmpFilePath = path.join(locations.BAKERY_TMP_DIR, tmpFile);

  const key = !bucketPath ?
    path.join(s3Creds.bucketRoot, tmpFile) :
    path.join(s3Creds.bucketRoot, bucketPath);

  const uploadParams = merge({}, {
    localFile: tmpFilePath,
    s3Params: {
      Bucket: s3Creds.bucket,
      Key: key,
      CacheControl: 'max-age=300',
    },
  }, customParams);

  const uploader = client.uploadFile(uploadParams);

  return new Promise((resolve, reject) => {
    uploader.on('error', (err) => reject(err));

    uploader.on('end', () => {
      cloudfrontInvalidate([key]).then(() => resolve());
    });
  });
};
