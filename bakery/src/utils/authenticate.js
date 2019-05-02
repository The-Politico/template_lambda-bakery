import { NO_AUTH_HEADER, NO_AUTH_TOKEN, INVALID_AUTH_TOKEN } from 'ServerConstants/errors';

export default headers => {
  if (!headers.authorization) {
    return NO_AUTH_HEADER();
  }

  const match = /^Token (.*)$/.exec(headers.authorization);
  if (!match) {
    return NO_AUTH_TOKEN();
  }

  if (match[1] !== process.env.API_VERIFICATION_TOKEN) {
    return INVALID_AUTH_TOKEN();
  };

  return null;
};
