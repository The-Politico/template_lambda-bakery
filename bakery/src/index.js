import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import authenticate from 'ServerUtils/authenticate';
import { NO_ACTION_TYPE, INVALID_ACTION_TYPE, SERVER_ERROR } from 'ServerConstants/errors';
import handlers from 'ServerHandlers';

const server = express();

// Parsers
server.use(bodyParser.json({
  type: ['application/json', 'text/plain'],
}));

// CORS
server.use(cors());

// Logging
if (!process.env.lambda) {
  server.use(morgan('dev'));
}

// GET Request
server.get('', (req, res) => {
  res.status(200);
  res.send('OK');
});

// POST Request
server.post('', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  // Authenticate request
  const authenticationError = authenticate(req.headers);
  if (authenticationError) {
    res.status(authenticationError.status);
    res.send(authenticationError.toString());
    return;
  }

  // Check for request action
  if (!req.body.action) {
    const noMethodException = NO_ACTION_TYPE();
    res.status(noMethodException.status);
    res.send(noMethodException.toString());
    return;
  }

  // Check that request action matches a handler
  if (!(req.body.action in handlers)) {
    const methodException = INVALID_ACTION_TYPE(req.body.action);
    res.status(methodException.status);
    res.send(methodException.toString());
    return;
  }

  // Execute handler
  const handler = handlers[req.body.action];
  handler(req.body).then(msg => {
    res.status(200);
    res.send(msg);
  }).catch(err => {
    if (err.custom) {
      res.status(err.status);
      res.send(err.toString());
    } else {
      const exception = SERVER_ERROR();
      res.status(exception.status);
      res.send(exception.toString());
      console.error(err);
    }
  });
});

module.exports = server;
