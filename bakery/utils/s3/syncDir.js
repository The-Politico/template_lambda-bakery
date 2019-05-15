import s3 from 's3';
import path from 'path';
import merge from 'lodash/merge';
import { s3 as s3Creds, locations } from 'Bakery/constants';
import cloudfrontInvalidate from './invalidate';

const REJECT_DEPTH = 3;

export default (
  { tmpPrefix = '', bucketPrefix = '' } = {},
  customFileParams = {},
  deleteRemoved = false
) => {
  const prefix = path.join(s3Creds.bucketRoot, bucketPrefix).replace(/\/?$/, '/');
  const localDir = path.join(locations.BAKERY_TMP_DIR, tmpPrefix);

  if (prefix.split('/').length < REJECT_DEPTH) {
    return new Error(`Sync path less than ${REJECT_DEPTH} folders deep in bucket.`);
  }

  const clientOptions = {
    s3Options: {
      accessKeyId: s3Creds.accessKeyId,
      secretAccessKey: s3Creds.secretAccessKey,
    },
  };

  const client = s3.createClient(clientOptions);

  const uploadParams = merge({}, {
    localDir: localDir,
    deleteRemoved: deleteRemoved,
    s3Params: {
      Bucket: s3Creds.bucket,
      Prefix: prefix,
      CacheControl: 'max-age=300',
    },
  }, customFileParams);

  return new Promise((resolve, reject) => {
    const uploader = client.uploadDir(uploadParams);

    uploader.on('error', (err) => reject(err));

    uploader.on('end', () => {
      console.log(`Synced ${localDir} to ${prefix}.`);
      if (!s3Creds.distribution) return resolve();
      cloudfrontInvalidate([`${prefix}*`]).then(() => resolve());
    });
  });
};
