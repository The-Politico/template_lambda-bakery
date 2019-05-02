const sendRes = (status, body) => {
  var response = {
    statusCode: status,
    headers: {
      'Content-Type': 'text/html',
    },
    body: body,
  };
  return response;
};

exports.handler = async(event, context) => {
  return sendRes(200, 'Hello World!');
};
