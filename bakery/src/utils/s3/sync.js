import s3 from 's3';
import merge from 'lodash/merge';
import cloudfrontInvalidate from './invalidate';

export default ({ directory, path, bucket, invalidate }, customParams = {}) => {
  const clientOptions = {
    s3Options: {
      accessKeyId: process.env.S3_ACCESS_KEY ? process.env.S3_ACCESS_KEY : process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_KEY ? process.env.S3_SECRET_KEY : process.env.AWS_SECRET_ACCESS_KEY,
    },
  };
  const client = s3.createClient(clientOptions);

  const uploadParams = merge({}, {
    localDir: directory,
    deleteRemoved: true,

    s3Params: {
      Bucket: bucket,
      Prefix: path,
      CacheControl: 'max-age=300',
    },
  }, customParams);

  const uploader = client.uploadDir(uploadParams);

  return new Promise((resolve, reject) => {
    uploader.on('error', function(err) {
      reject(err);
    });

    uploader.on('end', function() {
      if (invalidate) {
        cloudfrontInvalidate(
          process.env.AWS_CLOUDFRONT_DISTRIBUTION,
          [`/${path}*`]
        ).then(() => resolve());
      } else {
        resolve();
      }
    });
  });
};
