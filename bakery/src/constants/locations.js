import { publishPath } from 'Root/package.json';

export const S3_PATH_PREFIX = publishPath;
export const TMP = process.env.lambda === 'true' ? '/tmp/dist' : './tmp/dist';
