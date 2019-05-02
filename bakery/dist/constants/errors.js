"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const NO_AUTH_HEADER = exports.NO_AUTH_HEADER = () => {
  const err = new Error(`No Authorization header found.`);
  err.status = 403;
  err.custom = true;
  return err;
};

const NO_AUTH_TOKEN = exports.NO_AUTH_TOKEN = () => {
  const err = new Error(`No authentication token provided.`);
  err.status = 403;
  err.custom = true;
  return err;
};

const INVALID_AUTH_TOKEN = exports.INVALID_AUTH_TOKEN = () => {
  const err = new Error(`Invalid authentication token.`);
  err.status = 403;
  err.custom = true;
  return err;
};

const NO_ACTION_TYPE = exports.NO_ACTION_TYPE = () => {
  const err = new Error(`No action type provided.`);
  err.status = 403;
  err.custom = true;
  return err;
};

const INVALID_ACTION_TYPE = exports.INVALID_ACTION_TYPE = type => {
  const err = new Error(`Invalid action type: "${type}".`);
  err.status = 400;
  err.custom = true;
  return err;
};

const SERVER_ERROR = exports.SERVER_ERROR = () => {
  const err = new Error('Something went wrong. Contact a system administrator to check the log for more information.');
  err.status = 500;
  err.custom = true;
  return err;
};