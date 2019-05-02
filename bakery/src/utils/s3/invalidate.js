/*
 * Source: https://github.com/CoursePark/aws-cloudfront-invalidate
 * Simply modernizing the script since it can't be downloaded from npm anymore
 * And removed the default invalidateList to all because... too dangerous
 */
import AWS from 'aws-sdk';

export default (
  distribution,
  invalidateList,
  callerReference = Date.now().toString() // AWS needs a unique value for some reason
) => new Promise((resolve, reject) => {
  if (!distribution) {
    reject(new Error('No CloudFront distribution given.'));
  }

  const cloudfront = new AWS.CloudFront();
  cloudfront.createInvalidation({
    DistributionId: distribution,
    InvalidationBatch: {
      CallerReference: callerReference,
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
