/*
 * Source: https://github.com/CoursePark/aws-cloudfront-invalidate
 * Simply modernizing the script since it can't be downloaded from npm anymore
 * And removed the default invalidateList to all because... too dangerous
 */
import AWS from 'aws-sdk';
import { s3 as s3Creds } from 'Bakery/constants';

export default (invalidateList) => new Promise((resolve, reject) => {
  if (!s3Creds.distribution) {
    return reject(new Error('No CloudFront distribution given.'));
  }

  const cloudfront = new AWS.CloudFront();
  cloudfront.createInvalidation({
    DistributionId: s3Creds.distribution,
    InvalidationBatch: {
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: invalidateList.length,
        Items: invalidateList,
      },
    },
  }, (err, data) => {
    if (err) {
      reject(err);
    }

    resolve(data);
  });
});
