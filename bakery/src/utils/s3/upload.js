import s3 from 's3';
import path from 'path';
import merge from 'lodash/merge';
import cloudfrontInvalidate from './invalidate';

export default ({ file, rename: fn, path: fp, bucket, invalidate }, customParams = {}) => {
  const clientOptions = {
    s3Options: {
      accessKeyId: process.env.S3_ACCESS_KEY ? process.env.S3_ACCESS_KEY : process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_KEY ? process.env.S3_SECRET_KEY : process.env.AWS_SECRET_ACCESS_KEY,
    },
  };
  const client = s3.createClient(clientOptions);

  if (!fn) {
    const fileparts = file.split('/');
    fn = fileparts[fileparts.length - 1];
  }
  const key = path.join(fp, fn);

  const uploadParams = merge({}, {
    localFile: file,

    s3Params: {
      Bucket: bucket,
      Key: key,
      CacheControl: 'max-age=300',
    },
  }, customParams);

  const uploader = client.uploadFile(uploadParams);

  return new Promise((resolve, reject) => {
    uploader.on('error', function(err) {
      reject(err);
    });

    uploader.on('end', function() {
      if (invalidate) {
        cloudfrontInvalidate(
          process.env.AWS_CLOUDFRONT_DISTRIBUTION,
          [`/${key}`]
        ).then(() => resolve());
      } else {
        resolve();
      }
    });
  });
};