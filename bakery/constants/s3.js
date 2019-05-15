import { publishPath } from 'package.json';

export default {
  // We prefer a set of override keys, in case you need to write to an account
  // that is different from the one your lambda is in. Otherwise default.
  accessKeyId: process.env.AWS_PUBLISH_ACCESS_KEY_ID ? process.env.AWS_PUBLISH_ACCESS_KEY_ID : process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_PUBLISH_SECRET_ACCESS_KEY ? process.env.AWS_PUBLISH_SECRET_ACCESS_KEY : process.env.AWS_SECRET_ACCESS_KEY,
  // S3
  bucket: process.env.AWS_BUCKET_NAME,
  // S3 bucket root
  bucketRoot: publishPath,
  // CloudFront
  distribution: process.env.AWS_CLOUDFRONT_DISTRIBUTION,
};
