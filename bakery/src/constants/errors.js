export const NO_AUTH_HEADER = () => {
  const err = new Error(`No Authorization header found.`);
  err.status = 403;
  err.custom = true;
  return err;
};

export const NO_AUTH_TOKEN = () => {
  const err = new Error(`No authentication token provided.`);
  err.status = 403;
  err.custom = true;
  return err;
};

export const INVALID_AUTH_TOKEN = () => {
  const err = new Error(`Invalid authentication token.`);
  err.status = 403;
  err.custom = true;
  return err;
};

export const NO_ACTION_TYPE = () => {
  const err = new Error(`No action type provided.`);
  err.status = 403;
  err.custom = true;
  return err;
};

export const INVALID_ACTION_TYPE = type => {
  const err = new Error(`Invalid action type: "${type}".`);
  err.status = 400;
  err.custom = true;
  return err;
};

export const INVALID_TEMPLATE_TYPE = type => {
  const err = new Error(`Invalid template type: "${type}".`);
  err.status = 400;
  err.custom = true;
  return err;
};

export const SERVER_ERROR = () => {
  const err = new Error('Something went wrong. Contact a system administrator to check the log for more information.');
  err.status = 500;
  err.custom = true;
  return err;
};
